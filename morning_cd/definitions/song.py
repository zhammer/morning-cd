from typing import Dict, NamedTuple

from morning_cd.definitions import Vendor

class Song(NamedTuple):
    id: str
    vendor: Vendor
    name: str
    artist_name: str
    album_name: str
    image_url_by_size: Dict[str, str]
