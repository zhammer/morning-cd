import React from 'react';
import SongTile from 'components/SongTile';
import { Container, SimpleRow, Row, Text, SongLink } from './Listen.styles';
import Location from './Location.svg';
import Note from './Note.svg';
import Person from './Person.svg';

const Listen = ({ listen }) => (
  <Container>
    <SimpleRow>
      <SongLink href={`spotify:track:${listen.song.id}`}>
        <SongTile {...listen.song} />
      </SongLink>
    </SimpleRow>
    <Row>
      <Person height='1em' width='1em' />
      <Text>{listen.listenerName}</Text>
    </Row>
    {listen.note && (
      <Row>
        <Note height='1em' width='1em' />
        <Text>{listen.note}</Text>
      </Row>
    )}
    <Row>
      <Location height='1em' width='1em' />
      <Text>{listen.ianaTimezone}</Text>
    </Row>
  </Container>

);

export default Listen;
