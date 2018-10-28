from datetime import datetime

import pytest

from morning_cd import util
from morning_cd.definitions.exceptions import InvalidIanaTimezoneError


class TestLocalDate(object):

    def test_raises_invalid_iana_timezone_error_for_invalid_timezone(self) -> None:
        with pytest.raises(InvalidIanaTimezoneError):
            util.local_date(datetime.utcnow(), 'Aqua_Magna/Mata_Nui')
