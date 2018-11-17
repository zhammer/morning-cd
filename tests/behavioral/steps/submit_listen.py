import json
from contextlib import contextmanager
from datetime import datetime
from typing import Dict, Optional, Union

import behave

from freezegun import freeze_time

import responses

from morning_cd.definitions.vendor import Vendor
from morning_cd.delivery.aws_lambda.graphql import handler as morning_cd_graphql_handler
from morning_cd.gateways.db.sqlalchemy_db.models import SqlListen

from tests.behavioral.fixtures import (
    spotify as spotify_fixtures,
    sunrise_sunset as sunrise_sunset_fixtures
)


@given('My name is "{name}"')  # noqa: F811
def step_impl(context: behave.runner.Context, name: str):
    context.name = name


@given('I live in new york')  # noqa: F811
def step_impl(context: behave.runner.Context):
    context.iana_timezone = 'America/New_York'


@given('It\'s daytime at 10:30am on November 12th 2018')  # noqa: F811
def step_impl(context: behave.runner.Context):
    context.current_time_utc = datetime(2018, 11, 12, 15, 30)  # utc time
    context.is_day = True


@given('it\'s nighttime at 6pm on November 12th 2018')  # noqa: F811
def step_impl(context: behave.runner.Context):
    context.current_time_utc = datetime(2018, 11, 12, 23, 0)  # utc time
    context.is_day = False


@given('The first song I listened to today was \'Whispers\' by DAP The Contract')  # noqa: F811
def step_impl(context: behave.runner.Context):
    context.song_id = '4rNGLh1y5Kkvr4bT28yfHU'
    context.using_invalid_id = False


@given('the song id I want to submit is the invalid id "{invalid_song_id}"')  # noqa: F811
def step_impl(context: behave.runner.Context, invalid_song_id: str):
    context.song_id = invalid_song_id
    context.using_invalid_id = True


@given('I write the note "{note}"')  # noqa: F811
def step_impl(context: behave.runner.Context, note: str):
    context.note = note


@when('I submit my listen to morning.cd')  # noqa: F811
def step_impl(context: behave.runner.Context):
    mutation = """
      mutation submit($listenInput: GraphQlListenInput!) {
        submitListen(input: $listenInput) {
          id
          listenerName
          listenTimeUtc
          note
          ianaTimezone
          song {
            id
            name
            artistName
            albumName
            imageLargeUrl
            imageMediumUrl
            imageSmallUrl
          }
        }
      }
    """
    variables = {
        'listenInput': {
            'songId': context.song_id,
            'listenerName': context.name,
            'note': context.note,
            'ianaTimezone': context.iana_timezone
        }
    }

    event = {'body': make_graphql_request(mutation, variables)}

    with freeze_time(context.current_time_utc):
        with submit_listen_mock_network(context) as mock_network:
            submit_listen_response = morning_cd_graphql_handler(event, {})

    context.response = submit_listen_response
    context.mock_network = mock_network


@then('I am able to find my listen on morning.cd')  # noqa: F811
def step_impl(context: behave.runner.Context):
    sql_listen = context.session.query(SqlListen).one()

    assert sql_listen.id == 1
    assert sql_listen.song_id == context.song_id
    assert sql_listen.song_vendor == Vendor.SPOTIFY
    assert sql_listen.listener_name == context.name
    assert sql_listen.note == context.note
    assert sql_listen.listen_time_utc == context.current_time_utc
    assert sql_listen.iana_timezone == context.iana_timezone


@then('I am NOT able to find my listen on morning.cd')  # noqa: F811
def step_impl(context):
    sql_listens = context.session.query(SqlListen).all()
    assert sql_listens == []


@then('I get a response with my listen from morning.cd')  # noqa: F811
def step_impl(context: behave.runner.Context):
    assert context.response['statusCode'] == 200

    # values from the spotify get track request
    expected_album_name = spotify_fixtures.WHISPERS_SPOTIFY_TRACK['album']['name']
    expected_artist_name = spotify_fixtures.WHISPERS_SPOTIFY_TRACK['artists'][0]['name']
    expected_image_large_url = spotify_fixtures.WHISPERS_SPOTIFY_TRACK['album']['images'][0]['url']
    expected_image_medium_url = spotify_fixtures.WHISPERS_SPOTIFY_TRACK['album']['images'][1]['url']
    expected_image_small_url = spotify_fixtures.WHISPERS_SPOTIFY_TRACK['album']['images'][2]['url']
    expected_song_name = spotify_fixtures.WHISPERS_SPOTIFY_TRACK['name']

    expected_json_body = {
        'data': {
            'submitListen': {
                'ianaTimezone': context.iana_timezone,
                'id': '1',  # first song in db
                'listenTimeUtc': '2018-11-12T15:30:00',
                'listenerName': context.name,
                'note': context.note,
                'song': {
                    'albumName': expected_album_name,
                    'artistName': expected_artist_name,
                    'id': context.song_id,
                    'imageLargeUrl': expected_image_large_url,
                    'imageMediumUrl': expected_image_medium_url,
                    'imageSmallUrl': expected_image_small_url,
                    'name': expected_song_name
                }
            }
        }
    }

    body = json.loads(context.response['body'])
    assert body == expected_json_body


@then('I get an error response that says "{error_message}"')  # noqa: F811
def step_impl(context: behave.runner.Context, error_message: str):
    assert context.response['statusCode'] == 200

    body = json.loads(context.response['body'])
    assert error_message in body['errors'][0]['message']


@contextmanager
def submit_listen_mock_network(context: behave.runner.Context):
    """Is there any good way to do fixtures?"""
    with responses.RequestsMock() as mock_responses:
        # We get our access token from spotify
        mock_responses.add(spotify_fixtures.make_post_client_credentials())

        # We fetch the track from spotify to make sure it's valid. If not, this is the last request.
        if context.using_invalid_id:
            mock_responses.add(spotify_fixtures.make_get_track_invalid_id(context.song_id))
            yield mock_responses
            return
        mock_responses.add(spotify_fixtures.make_get_track_whispers())

        # We fetch the sunrise and sunset hours for today. If it's night, this is the last request.
        mock_responses.add(sunrise_sunset_fixtures.make_get_sunrise_sunset())
        if not context.is_day:
            yield mock_responses
            return

        # We fetch the track again to get info for our listen response.
        mock_responses.add(spotify_fixtures.make_get_track_whispers())

        yield mock_responses


def make_graphql_request(query: str, variables: Dict[str, Optional[Union[str, int, float]]]) -> str:
    return json.dumps({
        'query': query,
        'variables': variables
    })
