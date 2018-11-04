from functools import wraps
from typing import Any, Callable, TypeVar


Return = TypeVar('Return')  # return type


def with_attempt_refresh_client_credentials(func: Callable[..., Return]) -> Callable[..., Return]:
    """Takes a function of an object that has the following attributes...

    - An oauth `client_id` and `client_secret` pair for an external API
    - A `fetch_bearer_token` function with signature: `fetch_bearer_token(client_id, client_secret)`
    - A `bearer_token`
    - An `attempt_refetch_client_credentials` bool to toggle the decorator's behavior

    ...and decorates the function so that if a call to the function raises a `PermissionError`, a
    bearer token will be refetched for the object using the `client_id`, `client_secret` and
    `fetch_bearer_token`. After a new token is fetched and saved to the object,  and the wrapped
    function will be called again (only once).
    """
    @wraps(func)
    def inner(self: Any, *args: Any, **kwargs: Any) -> Return:
        if _is_client_credentials_refreshable(self) and self.attempt_refetch_client_credentials:
            try:
                return func(self, *args, **kwargs)
            except PermissionError:
                self.bearer_token = self.fetch_bearer_token(self.client_id, self.client_secret)
                return func(self, *args, **kwargs)

        else:
            return func(self, *args, **kwargs)

    return inner


def _is_client_credentials_refreshable(obj: object) -> bool:
    return (hasattr(obj, 'client_id')
            and hasattr(obj, 'client_secret')
            and hasattr(obj, 'attempt_refetch_client_credentials')
            and hasattr(obj, 'fetch_bearer_token')
            and hasattr(obj, 'bearer_token'))
