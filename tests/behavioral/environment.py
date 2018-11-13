import os

import behave

from tests.behavioral.fixtures.behave import (
    with_aws_lambda_environment_variables,
    with_empty_db
)


TEST_DATABASE_CONNECTION_STRING = os.environ.get(
    'TEST_DATABASE_CONNECTION_STRING',
    'sqlite:///morning_cd_behave_tests.db'
)


def before_scenario(context: behave.runner.Context, scenario: behave.model.Scenario) -> None:
    behave.use_fixture(
        with_aws_lambda_environment_variables,
        context,
        TEST_DATABASE_CONNECTION_STRING
    )
    behave.use_fixture(
        with_empty_db,
        context,
        TEST_DATABASE_CONNECTION_STRING
    )
