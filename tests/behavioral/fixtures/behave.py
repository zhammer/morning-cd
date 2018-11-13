import os
from typing import Generator
from unittest.mock import patch

import behave

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from morning_cd.gateways.db.sqlalchemy_db import models


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
    engine = create_engine(database_connection_string)
    models.Base.metadata.create_all(engine)
    context.session = sessionmaker(bind=engine)()

    yield

    models.Base.metadata.drop_all(engine)
