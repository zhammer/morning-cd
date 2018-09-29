import datetime

import graphene

from morning_cd import get_song, get_listen, get_listens, submit_listen
from morning_cd.definitions import Listen, SortOrder

class GraphQlSong(graphene.ObjectType):

    class Meta:
        interfaces = (graphene.relay.Node,)

    name = graphene.String()
    vendor = graphene.String()
    artist_name = graphene.String()
    album_name = graphene.String()

    image_large_url = graphene.String()
    image_medium_url = graphene.String()
    image_small_url = graphene.String()

    @classmethod
    def get_node(cls, info, id):
        return get_song(info.context, id)

    def resolve_image_large_url(self, info):
        return self.image_url_by_size['large']

    def resolve_image_medium_url(self, info):
        return self.image_url_by_size['medium']

    def resolve_image_small_url(self, info):
        return self.image_url_by_size['small']


class GraphQlListen(graphene.ObjectType):

    class Meta:
        interfaces = (graphene.relay.Node,)

    song = graphene.Field(GraphQlSong)
    listener_name = graphene.String()
    listen_time_utc = graphene.DateTime()
    note = graphene.String()
    iana_timezone = graphene.String()

    def resolve_song(self, info):
        return get_song(info.context, self.song_id)

    @classmethod
    def get_node(cls, info, id):
        return get_listen(info.context, id)


GraphQlSortOrder = graphene.Enum.from_enum(SortOrder)


class Query(graphene.ObjectType):

    node = graphene.relay.Node.Field()
    listen = graphene.Field(GraphQlListen, args={'id': graphene.ID()})
    all_listens = graphene.List(GraphQlListen, args={
        'before_utc': graphene.DateTime(),
        'after_utc': graphene.DateTime(),
        'limit': graphene.Int(),
        'sort_order': graphene.Argument(GraphQlSortOrder, default_value=SortOrder.ASCENDING)
    })

    def resolve_listen(self, info, id):
        return get_listen(info.context, id)

    def resolve_all_listens(self, info, before_utc, after_utc, limit, sort_order):
        return get_listens(info.context, before_utc, after_utc, SortOrder(sort_order), limit)

class GraphQlListenInput(graphene.InputObjectType):
    song_id = graphene.String(required=True)
    song_vendor = graphene.String(required=True)
    listener_name = graphene.String(required=True)
    note = graphene.String(required=True)
    iana_timezone = graphene.String(required=True)


class SubmitListen(graphene.Mutation):
    class Arguments:
        listen_data = GraphQlListenInput(required=True)

    Output = GraphQlListen

    def mutate(self, info, listen_data):
        listen = Listen(
            **listen_data,
            listen_time_utc=datetime.datetime.now(datetime.timezone.utc)
        )
        return submit_listen(info.context, listen)


class Mutation(graphene.ObjectType):
    submit_listen = SubmitListen.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
