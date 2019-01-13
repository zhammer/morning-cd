import React, { useMemo } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { Listen as ListenInterface } from '../../types';
import Listen from './Listen';
import { Container, Separater, ShowNewListensButton } from './ListenDeck.styles';
import DotLoading from '../../components/DotLoading';

interface ListenDeckProps {
  listens: ListenInterface[];
  newListens: ListenInterface[];
  onShowNewListensClicked: () => void;
  onLastListenVisible: () => void;
  loadingMore: boolean;
}

function ListenDeck({ listens, newListens, onLastListenVisible, loadingMore, onShowNewListensClicked }: ListenDeckProps) {
  const numNewListens = useMemo(() => newListens.length, [newListens]);
  return (
    <Container>
      {numNewListens > 0 && (
        <ShowNewListensButton onClick={onShowNewListensClicked} >
          See {numNewListens} new listen{numNewListens > 1 && 's'}
        </ShowNewListensButton>
      )}
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
      {loadingMore && (
        <>
          <Separater />
          <DotLoading />
        </>
      )}
    </Container>
  );
}


export default ListenDeck;
