import React from 'react';
import { Column } from 'components/styles';
import ListenDeck from './components/ListenDeck';
import { Header } from './ListensPage.styles';

const HEADER_TEXT = 'Here are the first pieces of music people listened to today, from all over the world.';
const HEADER_TEXT_NO_LISTENS = 'Nobody posted a listen to morning.cd today. Check back here later tonight. Morning.cd works all around the world, and it’s daytime somewhere.';

const ListensPage = ({ listens, onLastListenVisible }) => (
  <Column>
    <Header>{listens.length > 0 ? HEADER_TEXT : HEADER_TEXT_NO_LISTENS}</Header>
    <ListenDeck listens={listens} onLastListenVisible={onLastListenVisible} />
  </Column>
);

export default ListensPage;
