import os
import webbrowser

from flask import Flask

from flask_graphql import GraphQLView

from morning_cd.context import Context
from morning_cd.delivery.flask.util import is_flask_reload
from morning_cd.delivery.graphql import schema
from morning_cd.gateways.db import SqlAlchemyDbGateway
from morning_cd.gateways.geo_timezone import MockGeoTimezoneGateway
from morning_cd.gateways.music import SpotifyGateway
from morning_cd.gateways.sunlight import SunriseSunsetApiGateway


spotify_client_id = os.environ['SPOTIFY_CLIENT_ID']
spotify_client_secret = os.environ['SPOTIFY_CLIENT_SECRET']

sqlalchemy_db = SqlAlchemyDbGateway('sqlite:///localmorningcd.db', echo=True)
sqlalchemy_db.persist_schema()

context = Context(
    db_gateway=sqlalchemy_db,
    geo_timezone_gateway=MockGeoTimezoneGateway(),
    music_gateway=SpotifyGateway(
        client_id=spotify_client_id,
        client_secret=spotify_client_secret,
        attempt_refetch_client_credentials=True
    ),
    sunlight_gateway=SunriseSunsetApiGateway()
)

app = Flask(__name__)
app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        get_context=lambda: context,
        graphiql=True
    )
)

if is_flask_reload(os.environ):
    webbrowser.open('http://localhost:5000/graphql')
