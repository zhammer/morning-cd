from typing import Any, NamedTuple, Optional


class PageInfo(NamedTuple):
    has_next_page: bool
    has_previous_page: bool


class RelayPaginationArguments(NamedTuple):
    """Helper class to make all the connection logic more readable, specifically re: the relay
    `PageInfo` spec: https://facebook.github.io/relay/graphql/connections.htm.
    """
    first: Optional[int] = None
    last: Optional[int] = None
    before: Optional[Any] = None
    after: Optional[Any] = None

    @property
    def first_is_set(self) -> bool:
        return self.first is not None

    @property
    def last_is_set(self) -> bool:
        return self.last is not None

    @property
    def before_is_set(self) -> bool:
        return self.before is not None

    @property
    def after_is_set(self) -> bool:
        return self.after is not None

    @classmethod
    def make_relay_pagination_arguments(cls,
                                        first: Optional[int] = None,
                                        last: Optional[int] = None,
                                        before: Optional[Any] = None,
                                        after: Optional[Any] = None) -> Any:
        if not _xor(first, last):
            raise ValueError('Either `first` or `last` must be set, but not both.')

        return cls(
            first=first,
            last=last,
            before=before,
            after=after
        )


def build_page_info(has_more: bool,
                    pagination_args: RelayPaginationArguments) -> PageInfo:
    """According to the relay connection spec, if `first` is set and the connection has more
    elements than the first n elements returned, set `hasNextPage` is true. If `first` _and_
    `after` are set, you can set `hasPreviousPage` to True _if_ 'the server can efficiently
    determine that elements exist prior to after', which would be a pain so we set to False.
    Same applies to last/before.
    """
    if pagination_args.first_is_set:
        has_next_page = has_more
        has_previous_page = False

    elif pagination_args.last_is_set:
        has_next_page = False
        has_previous_page = has_more

    else:
        raise RuntimeError(f'Invalid pagination args: {pagination_args}.')

    return PageInfo(
        has_next_page=has_next_page,
        has_previous_page=has_previous_page
    )


def _xor(left: Optional[Any], right: Optional[Any]) -> bool:
    """Return True if either `left` or `right` is not None, otherwise return False.

    # Only `left`
    >>> _xor('Foo', None)
    True

    # Only `right`
    >>> _xor(None, 'Bar')
    True

    # `left` and `right` are not None
    >>> _xor('Foo', 'Bar')
    False

    # `left` and `right` are None
    >>> _xor(None, None)
    False
    """
    return (left is not None and right is None) or (left is None and right is not None)
