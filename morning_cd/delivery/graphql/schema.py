from datetime import date, datetime
from typing import List

import graphene
from graphql import ResolveInfo

from morning_cd import (
    get_song_of_listen,
    get_listen,
    get_listens,
    get_sunlight_window,
    submit_listen
)
from morning_cd.definitions import Listen, Song, SortOrder, SunlightWindow, Vendor


GraphQlSortOrder = graphene.Enum.from_enum(SortOrder)
GraphQlVendor = graphene.Enum.from_enum(Vendor)


class GraphQlSong(graphene.ObjectType):

    class Meta:
        interfaces = (graphene.relay.Node,)

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

    class Meta:
        interfaces = (graphene.relay.Node,)

    song = graphene.Field(GraphQlSong)
    listener_name = graphene.String()
    listen_time_utc = graphene.DateTime()
    note = graphene.String()
    iana_timezone = graphene.String()

    def resolve_song(self: Listen, info: ResolveInfo) -> Song:
        return get_song_of_listen(info.context, self)

    @classmethod
    def get_node(cls, info: ResolveInfo, id: str) -> Listen:
        return get_listen(info.context, id)


class GraphQlSunlightWindow(graphene.ObjectType):

    sunrise_utc = graphene.DateTime()
    sunset_utc = graphene.DateTime()


class Query(graphene.ObjectType):

    node = graphene.relay.Node.Field()
    listen = graphene.Field(GraphQlListen, args={'id': graphene.ID()})
    all_listens = graphene.List(GraphQlListen, args={
        'before_utc': graphene.DateTime(),
        'after_utc': graphene.DateTime(),
        'limit': graphene.Int(),
        'sort_order': graphene.Argument(
            GraphQlSortOrder,
            default_value=GraphQlSortOrder.ASCENDING.value
        )
    })
    today_sunlight_window = graphene.Field(GraphQlSunlightWindow, args={
        'iana_timezone': graphene.String()
    })

    def resolve_listen(self, info: ResolveInfo, id: str) -> Listen:
        return get_listen(info.context, id)

    def resolve_all_listens(self,
                            info: ResolveInfo,
                            before_utc: datetime,
                            after_utc: datetime,
                            limit: int,
                            sort_order: SortOrder) -> List[Listen]:
        return get_listens(info.context, before_utc, after_utc, SortOrder(sort_order), limit)

    def resolve_today_sunlight_window(self,
                                      info: ResolveInfo,
                                      iana_timezone: str) -> SunlightWindow:
        return get_sunlight_window(info.context, iana_timezone, date.today())


class GraphQlListenInput(graphene.InputObjectType):

    song_id = graphene.String(required=True)
    song_vendor = GraphQlVendor(default_value=GraphQlVendor.SPOTIFY.value)
    listener_name = graphene.String(required=True)
    note = graphene.String(required=True)
    iana_timezone = graphene.String(required=True)


class SubmitListen(graphene.Mutation):

    class Arguments:
        listen_data = GraphQlListenInput(required=True)

    Output = GraphQlListen

    def mutate(self, info: ResolveInfo, listen_data: GraphQlListenInput) -> Listen:
        listen = Listen(
            song_id=listen_data.song_id,
            song_vendor=Vendor(listen_data.song_vendor),
            listener_name=listen_data.listener_name,
            listen_time_utc=datetime.utcnow(),
            note=listen_data.note,
            iana_timezone=listen_data.iana_timezone
        )
        return submit_listen(info.context, listen)


class Mutation(graphene.ObjectType):
    submit_listen = SubmitListen.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
