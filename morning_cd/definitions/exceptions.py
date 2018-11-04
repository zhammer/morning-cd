"""Several expected morning cd exceptions."""


class MorningCdException(Exception):
    """Base exception for morning_cd exceptions."""


class InvalidSongError(MorningCdException):
    """Exception raised upon encountering a song that does not exist."""


class InvalidIanaTimezoneError(MorningCdException):
    """Exception raised upon encountering an invalid timezone name."""


class SunlightError(MorningCdException):
    """Exception raised upon encountering a day action attempted at night."""
