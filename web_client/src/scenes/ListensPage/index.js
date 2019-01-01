import React from 'react';
import { Column } from 'components/styles';
import ListenDeck from './ListenDesk';
import { Header, Sub, SubRow } from './ListensPage.styles';

const HEADER_TEXT = 'Here are the first pieces of music people listened to today, from all over the world.';
const HEADER_TEXT_NO_LISTENS = 'Nobody posted a listen to morning.cd today. Check back here later tonight. Morning.cd works all around the world, and it’s daytime somewhere.';
const PLAYLIST_TEXT = '[Listen to today\'s spotify playlist]';
const PLAYLIST_TEXT_NO_LISTENS = '[Listen to previous spotify playlists]';

const ListensPage = ({ listens, onLastListenVisible }) => (
  <Column>
    <Header>{listens.length > 0 ? HEADER_TEXT : HEADER_TEXT_NO_LISTENS}</Header>
    <SubRow>
      <Sub href='https://open.spotify.com/user/8fueir54qwc1v07r1cdl3k4rx'
           target='_blank'>
        {listens.length > 0 ? PLAYLIST_TEXT : PLAYLIST_TEXT_NO_LISTENS}
      </Sub>
    </SubRow>
    <ListenDeck listens={listens} onLastListenVisible={onLastListenVisible} />
  </Column>
);

export default ListensPage;
