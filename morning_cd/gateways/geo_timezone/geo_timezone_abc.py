from abc import ABC, abstractmethod

from morning_cd.definitions import GeoTimezone


class GeoTimezoneGatewayABC(ABC):

    @abstractmethod
    def fetch_geo_timezone(self, iana_name: str) -> GeoTimezone:
        ...
