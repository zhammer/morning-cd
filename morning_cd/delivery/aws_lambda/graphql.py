import json
import os
from typing import Dict

import graphql_server

from morning_cd.delivery.aws_lambda import util
from morning_cd.delivery.graphql import schema


def handler(event: Dict, context: Dict) -> Dict:
    database_connection_string = os.environ['DATABASE_CONNECTION_STRING']
    spotify_client_id = os.environ['SPOTIFY_CLIENT_ID']
    spotify_client_secret = os.environ['SPOTIFY_CLIENT_SECRET']

    body = event['body']
    query_data = json.loads(body)

    morning_cd_context = util.create_default_context(
        database_connection_string,
        spotify_client_id,
        spotify_client_secret
    )

    results, _ = graphql_server.run_http_query(
        schema=schema,
        request_method='post',
        data={},
        query_data=query_data,
        context=morning_cd_context
    )

    return {
        'statusCode': 200,
        'body': json.dumps(results[0].to_dict())
    }
