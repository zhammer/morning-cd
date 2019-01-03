import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { Listen as ListenInterface } from '../../types';
import Listen from './Listen';
import { Container, Separater } from './ListenDeck.styles';

interface ListenDeckProps {
  listens: ListenInterface[];
  onLastListenVisible: () => void;
}

function ListenDeck({ listens, onLastListenVisible }: ListenDeckProps) {
  return (
    <Container>
      {listens
        .slice()
        .reverse()
        .map((listen, index) => (
          <div key={listen.id}>
            {(index > 0) && <Separater />}
            {index === (listens.length - 1) ? (
              <VisibilitySensor onChange={isVisible => isVisible && onLastListenVisible()}>
                <Listen listen={listen} />
              </VisibilitySensor>
            ) : <Listen listen={listen} />
            }
          </div>
        ))
      }
    </Container>
  );
}


export default ListenDeck;
