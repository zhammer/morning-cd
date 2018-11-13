import os
from typing import Generator
from unittest.mock import patch

import behave

from morning_cd.gateways.db import SqlAlchemyDbGateway


@behave.fixture  # type: ignore
def with_aws_lambda_environment_variables(context: behave.runner.Context,
                                          database_connection_string: str) -> Generator:
    mock_env = {
        'DATABASE_CONNECTION_STRING': database_connection_string,
        'SPOTIFY_CLIENT_ID': 'mock spotify client id',
        'SPOTIFY_CLIENT_SECRET': 'mock spotify_client_secret'
    }

    with patch.dict(os.environ, mock_env):
        yield


@behave.fixture  # type: ignore
def with_empty_db(context: behave.runner.Context, database_connection_string: str) -> Generator:
    sqlalchemy_db = SqlAlchemyDbGateway(database_connection_string)
    sqlalchemy_db.persist_schema()

    context.session = sqlalchemy_db.session

    yield

    if database_connection_string.endswith('.db'):
        db_file = database_connection_string.split('///')[1]
        os.remove(db_file)
