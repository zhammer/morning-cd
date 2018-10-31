import os
import webbrowser

from flask import Flask, jsonify

from flask_graphql import GraphQLView

from morning_cd.context import Context
from morning_cd.delivery.flask.util import is_flask_reload
from morning_cd.delivery.graphql import schema
from morning_cd.gateways.db import SqlAlchemyDbGateway
from morning_cd.gateways.geo_timezone import GeoTimezoneGateway
from morning_cd.gateways.music import SpotifyGateway
from morning_cd.gateways.sunlight import SunriseSunsetApiGateway


spotify_client_id = os.environ['SPOTIFY_CLIENT_ID']
spotify_client_secret = os.environ['SPOTIFY_CLIENT_SECRET']

# to use a local postgres instance, set this environment variable to 'postgresql://localhost:5432'
morning_cd_playground_db = os.environ.get('MORNING_CD_PLAYGROUND_DB', 'sqlite:///localmorningcd.db')

sqlalchemy_db = SqlAlchemyDbGateway(morning_cd_playground_db, echo=True)
sqlalchemy_db.persist_schema()

context = Context(
    db_gateway=sqlalchemy_db,
    geo_timezone_gateway=GeoTimezoneGateway(),
    music_gateway=SpotifyGateway(
        client_id=spotify_client_id,
        client_secret=spotify_client_secret,
        attempt_refetch_client_credentials=True
    ),
    sunlight_gateway=SunriseSunsetApiGateway()
)

app = Flask(__name__)
app.add_url_rule(
    '/api/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        get_context=lambda: context,
        graphiql=True
    )
)


@app.route('/api/accesstoken')
def access_token():  # type: ignore
    access_token = SpotifyGateway.fetch_bearer_token(spotify_client_id, spotify_client_secret)
    body = {'accessToken': access_token}
    return jsonify(body)


if is_flask_reload(os.environ):
    webbrowser.open('http://localhost:5000/api/graphql')
