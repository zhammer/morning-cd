"""Aws lambda delivery for fetching a spotify access token."""

import json
import os
from typing import Any, Dict

import requests

from morning_cd.gateways.music import SpotifyGateway


def handler(event: Dict, context: Any) -> Dict:
    client_id: str = os.environ['SPOTIFY_CLIENT_ID']
    client_secret: str = os.environ['SPOTIFY_CLIENT_SECRET']

    access_token = SpotifyGateway.fetch_bearer_token(client_id, client_secret)

    return {
        'statusCode': 200,
        'body': json.dumps({'accessToken': access_token}),
        'headers': {'Access-Control-Allow-Origin': '*'}
    }
