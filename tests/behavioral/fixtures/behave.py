import os
from typing import Generator
from unittest.mock import patch

import behave

from morning_cd.gateways.db import SqlAlchemyDbGateway


TEST_DATABASE_CONNECTION_STRING = os.environ.get(
    'TEST_DATABASE_CONNECTION_STRING',
    'sqlite:///morning_cd_behave_tests.db'
)


@behave.fixture  # type: ignore
def with_aws_lambda_environment_variables(context: behave.runner.Context) -> Generator:
    mock_env = {
        'DATABASE_CONNECTION_STRING': TEST_DATABASE_CONNECTION_STRING,
        'SPOTIFY_CLIENT_ID': 'mock spotify client id',
        'SPOTIFY_CLIENT_SECRET': 'mock spotify_client_secret'
    }

    with patch.dict(os.environ, mock_env):
        yield


@behave.fixture  # type: ignore
def with_empty_db(context: behave.runner.Context) -> Generator:
    sqlalchemy_db = SqlAlchemyDbGateway(TEST_DATABASE_CONNECTION_STRING)
    sqlalchemy_db.persist_schema()

    context.session = sqlalchemy_db.session

    yield

    if TEST_DATABASE_CONNECTION_STRING.endswith('.db'):
        db_file = TEST_DATABASE_CONNECTION_STRING.split('///')[1]
        os.remove(db_file)
