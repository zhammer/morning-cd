"""Leading note here is that Graphene is a weird library with very little documentation. The feature
(bug?) that this code takes advantage of is that resolvers that you'd expect to return graphene
objects (ex: resolve_person) can actually return non-graphene classes (ex: a Person NamedTuple).

So we can have:
```py

class PersonNamedTuple(NamedTuple):
  first_name: str
  last_name: str

class PersonGraphQl(graphene.ObjectType):
  first_name: graphene.String()
  last_name: graphene.String()
  full_name: graphene.String()

  def resolve_full_name(self: PersonNamedTuple) -> str:  # self is a PersonNamedTuple?
    return self.first_name + ' ' + self.last_name

class Query(graphene.ObjectType):
  person = graphene.Field(person)

  def resolve_person(self) -> PersonNamedTuple:  # resolve_person doesnt return a PersonGraphQl?
    return PersonNamedTuple('Michael', 'Jackson')

```

This is mentioned in the docs: 'NOTE: The resolvers on a ObjectType are always treated as
staticmethods, so the first argument to the resolver method self (or root) need not be an
actual instance of the ObjectType.' But it still is a little funky, and even moreso for
the relay connection classes.
"""
from datetime import datetime
from typing import List, Optional

import graphene

from graphql import ResolveInfo

from morning_cd import (
    get_listen,
    get_listens,
    get_song_of_listen,
    get_sunlight_window,
    submit_listen
)
from morning_cd.definitions import Listen, Song, SortOrder, SunlightWindow, Vendor
from morning_cd.delivery.graphql.util import RelayPaginationArguments, build_page_info


GraphQlSortOrder = graphene.Enum.from_enum(SortOrder)
GraphQlVendor = graphene.Enum.from_enum(Vendor)


class GraphQlSong(graphene.ObjectType):
    """Resolver interface for a `Song`. Instantiated with a `morning_cd.definitions.Song`."""
    id = graphene.ID(required=True)
    name = graphene.String()
    vendor = GraphQlVendor()
    artist_name = graphene.String()
    album_name = graphene.String()
    image_large_url = graphene.String()
    image_medium_url = graphene.String()
    image_small_url = graphene.String()

    def resolve_image_large_url(self: Song, info: ResolveInfo) -> str:
        return self.image_url_by_size['large']

    def resolve_image_medium_url(self: Song, info: ResolveInfo) -> str:
        return self.image_url_by_size['medium']

    def resolve_image_small_url(self: Song, info: ResolveInfo) -> str:
        return self.image_url_by_size['small']


class GraphQlListen(graphene.ObjectType):
    """Resolver interface for a `Listen`. Instantiated with a `morning_cd.definitions.Listen`."""
    id = graphene.ID(required=True)
    song = graphene.Field(GraphQlSong)
    listener_name = graphene.String()
    listen_time_utc = graphene.DateTime()
    note = graphene.String()
    iana_timezone = graphene.String()

    def resolve_song(self: Listen, info: ResolveInfo) -> Song:
        return get_song_of_listen(info.context, self)


class ListenConnection(graphene.relay.Connection):
    """Resolver interface for a `ListenConnection`. Graphene is a weird library, and right now all
    of the resolving logic is in `Query.resolve_all_listens`. It'd be nice to move that logic here,
    or (if I understand Graphene correctly) to `ListenConnectionField`.
    """
    class Meta:
        node = GraphQlListen

    class Edge:
        node = GraphQlListen()
        cursor = graphene.DateTime()


class GraphQlSunlightWindow(graphene.ObjectType):
    """Resolver interface for a `SunlightWindow`. Instantiated with a
    `morning_cd.definitions.SunlightWindow`.
    """
    sunrise_utc = graphene.DateTime(required=True)
    sunset_utc = graphene.DateTime(required=True)


class Query(graphene.ObjectType):
    """Root query resolver interface."""
    listen = graphene.Field(GraphQlListen, args={'id': graphene.ID(required=True)})

    all_listens = graphene.relay.ConnectionField(
        ListenConnection,
        before=graphene.DateTime(),
        after=graphene.DateTime()
    )

    today_sunlight_window = graphene.Field(GraphQlSunlightWindow, args={
        'iana_timezone': graphene.String(required=True)
    })

    def resolve_listen(self, info: ResolveInfo, id: str) -> Listen:
        return get_listen(info.context, id)

    def resolve_all_listens(self,
                            info: ResolveInfo,
                            before: Optional[datetime] = None,
                            after: Optional[datetime] = None,
                            first: Optional[int] = None,
                            last: Optional[int] = None) -> ListenConnection:
        """Resolver for allListens that returns a ListenConnection. Graphene is super confusing
        and therefore so is this (at the moment).
        """
        pagination_args = RelayPaginationArguments.make_relay_pagination_arguments(
            first=first,
            last=last,
            before=before,
            after=after
        )

        # if we're getting the first n listens, we'll just get listens limit `first` in ascending
        # order. if we're getting the last n listens, we'll get listens limit `last` in descending
        # order, then reverse that output. "is it worth it? let me work it. i put my thing down,
        # flip it and reverse it."
        sort_order = SortOrder.DESCENDING if pagination_args.last_is_set else SortOrder.ASCENDING
        limit = pagination_args.first if pagination_args.first_is_set else pagination_args.last

        listens_plus_one = get_listens(
            info.context,
            before_utc=before,
            after_utc=after,
            sort_time=sort_order,
            limit=limit + 1  # + 1, to see if the db 'has more'
        )
        has_more = len(listens_plus_one) == limit + 1
        listens = listens_plus_one[:limit]

        if pagination_args.last_is_set:
            listens = list(reversed(listens))

        return Query._build_listen_connection(listens, has_more, pagination_args)

    def _build_listen_connection(listens: List[Listen],
                                 has_more: bool,
                                 pagination_args: RelayPaginationArguments) -> ListenConnection:
        return ListenConnection(
            edges=Query._build_listen_edges(listens),
            page_info=build_page_info(has_more, pagination_args)
        )

    def _build_listen_edges(listens: List[Listen]) -> List[ListenConnection.Edge]:
        return [ListenConnection.Edge(node=listen, cursor=listen.listen_time_utc)  # type: ignore
                for listen in listens]

    def resolve_today_sunlight_window(self,
                                      info: ResolveInfo,
                                      iana_timezone: str) -> SunlightWindow:
        return get_sunlight_window(
            info.context,
            iana_timezone,
            at=datetime.utcnow()
        )


class GraphQlListenInput(graphene.InputObjectType):
    """Input for submitting a listen."""
    song_id = graphene.String(required=True)
    song_vendor = GraphQlVendor(default_value=GraphQlVendor.SPOTIFY.value)
    listener_name = graphene.String(required=True)
    note = graphene.String(required=False)
    iana_timezone = graphene.String(required=True)


class SubmitListen(graphene.Mutation):
    """Mutation resolver interface for submitting a listen."""
    class Arguments:
        input = GraphQlListenInput(required=True)

    Output = GraphQlListen

    def mutate(self, info: ResolveInfo, input: GraphQlListenInput) -> Listen:
        listen = Listen(
            song_id=input.song_id,
            song_vendor=Vendor(input.song_vendor),
            listener_name=input.listener_name,
            listen_time_utc=datetime.utcnow(),
            note=input.note,
            iana_timezone=input.iana_timezone
        )
        return submit_listen(info.context, listen)


class Mutation(graphene.ObjectType):
    """Root mutation resolver class."""
    submit_listen = SubmitListen.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
