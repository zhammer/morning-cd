from abc import ABC, abstractmethod

from morning_cd.definitions import GeoTimezone


class GeoTimezoneGatewayABC(ABC):

    @abstractmethod
    def fetch(self, iana_name: str) -> GeoTimezone:
        ...
