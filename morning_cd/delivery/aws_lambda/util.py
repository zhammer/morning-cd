from morning_cd.context import Context
from morning_cd.gateways.db import SqlAlchemyDbGateway
from morning_cd.gateways.geo_timezone import GeoTimezoneGateway
from morning_cd.gateways.music import SpotifyGateway
from morning_cd.gateways.sunlight import SunriseSunsetApiGateway


def create_default_context(db_connection_string: str,
                           spotify_client_id: str,
                           spotify_client_secret: str) -> Context:
    return Context(
        db_gateway=SqlAlchemyDbGateway(db_connection_string),
        geo_timezone_gateway=GeoTimezoneGateway(),
        music_gateway=SpotifyGateway(
            client_id=spotify_client_id,
            client_secret=spotify_client_secret,
            attempt_refetch_client_credentials=True
        ),
        sunlight_gateway=SunriseSunsetApiGateway()
    )
