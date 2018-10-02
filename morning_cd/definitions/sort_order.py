from enum import Enum, unique


@unique
class SortOrder(Enum):
    ASCENDING = 0
    DESCENDING = 1
