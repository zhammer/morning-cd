from typing import NamedTuple

from morning_cd.gateways.db import DbGatewayABC
from morning_cd.gateways.geo_timezone import GeoTimezoneGatewayABC
from morning_cd.gateways.music import MusicGatewayABC
from morning_cd.gateways.sunlight import SunlightGatewayABC


class Context(NamedTuple):
    sunlight_gateway: SunlightGatewayABC
    db_gateway: DbGatewayABC
    geo_timezone_gateway: GeoTimezoneGatewayABC
    music_gateway: MusicGatewayABC
