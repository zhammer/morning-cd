import behave

from tests.behavioral.fixtures.behave import (
    with_aws_lambda_environment_variables,
    with_empty_db
)


def before_scenario(context: behave.runner.Context, scenario: behave.model.Scenario) -> None:
    behave.use_fixture(with_aws_lambda_environment_variables, context)
    behave.use_fixture(with_empty_db, context)
