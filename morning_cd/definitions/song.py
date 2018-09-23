from typing import Dict, NamedTuple


class Song(NamedTuple):
    id: str
    vendor: str
    name: str
    artist_name: str
    album_name: str
    image_url_by_size: Dict[str, str]
