"""Aws lambda delivery for fetching a spotify access token."""

import json
import os
import requests

def fetch_access_token(client_id, client_secret):
    response = requests.post(
        'https://accounts.spotify.com/api/token',
        auth=(client_id, client_secret),
        data={'grant_type': 'client_credentials'}
    )
    return response.json()['access_token']

def handler(event, context):
    client_id = os.environ['SPOTIFY_CLIENT_ID']
    client_secret = os.environ['SPOTIFY_CLIENT_SECRET']
    access_token = fetch_access_token(client_id, client_secret)
    return {
        'statusCode': 200,
        'body': json.dumps({'accessToken': access_token}),
        'headers': {'Access-Control-Allow-Origin': '*'}
    }
