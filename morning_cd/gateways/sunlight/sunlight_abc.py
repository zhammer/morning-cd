from abc import ABC, abstractmethod
from datetime import date

from morning_cd.definitions import Coordinates, SunlightInfo


class SunlightGatewayABC(ABC):

    @abstractmethod
    def fetch(self, coordinates: Coordinates, on_day: date) -> SunlightInfo:
        ...
