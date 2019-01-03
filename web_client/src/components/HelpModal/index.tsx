import React, { useContext, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HelpButton from './HelpButton';
import SundialContext from '../../hooks/useSundial/context';
import {
  ModalBody,
  SectionDivider,
  SectionBody,
  SectionTitle,
  SocialButtons
} from './HelpModal.styles';
import { Modal, Button } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

const MORNING_CD_SPOTIFY = 'https://open.spotify.com/user/8fueir54qwc1v07r1cdl3k4rx';
const SKETCHY = 'https://thenounproject.com/ralfschmitzer/collection/sketchy/';
const JODY_TWEET_1 = 'https://twitter.com/jodyavirgan/status/1046021283488681984';
const JODY_TWEET_2 = 'https://twitter.com/jodyavirgan/status/1063779363244654593';
const JODY_TWEET_3 = 'https://twitter.com/jodyavirgan/status/1071420384220655616';
const JODY_TWEET_4 = 'https://twitter.com/jodyavirgan/status/1076483891429543937';

function HelpModal() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(!open), [open]);
  const sundial = useContext(SundialContext);
  const isDay = sundial.isDay || sundial.calibrating;
  return (
    <>
      <HelpButton onClick={() => setOpen(true)}/>
      <Modal isOpen={open} toggle={toggleOpen} >
        <ModalBody isDay={isDay}>
          <Button close
                  onClick={() => setOpen(false)}
                  style={{
                    transform: 'translate(.4em, -.75em)',
                    transition: 'color 5s linear',
                    color: isDay ? 'black' : 'white'}}
                  />
          <SectionTitle isDay={isDay}>🌟 About 🌟</SectionTitle>
          <SectionBody isDay={isDay}>
            Morning cd builds a <a href={MORNING_CD_SPOTIFY} target='_blank'>daily playlist</a> of the first pieces of music people
            listened each day from all over the world. You can submit a listen (with a 
            note!) once a day. If you visit morning cd at night, you can view the listens
            submitted since sunrise, but will have to wait until the next sunrise to submit
            a song.
          </SectionBody>
          <SectionDivider isDay={isDay} />
          <SectionTitle isDay={isDay}>🌟 Credits 🌟</SectionTitle>
          <SectionBody isDay={isDay}>
            Created by <a href='https://github.com/zhammer' target='_blank'>Zach Hammer</a>.
            Inspired by the <a href={JODY_TWEET_1} target='_blank'>sporadic</a>{' '}
            <a href={JODY_TWEET_2} target='_blank'>tweets</a> of{' '}
            <a href={JODY_TWEET_3} target='_blank'>Jody</a>{' '}
            <a href={JODY_TWEET_4} target='_blank'>Avirgan</a>.{' '}
            Illustrations from Ralf Schmitzer's <a href={SKETCHY} target='_blank'>Sketchy collection</a>.
          </SectionBody>
          <SectionDivider isDay={isDay} />
          <SectionTitle isDay={isDay}>🌟 Issues 🌟</SectionTitle>
          <SectionBody isDay={isDay}>
            If you have a suggestion, notice an issue or want to contribute to morning cd, 
            send an <a href='mailto:zachary_hammer@alumni.brown.edu?subject=re: morning cd'>email</a> or create an 
            issue on <a href='https://github.com/zhammer/morning-cd' target='_blank'>github</a>.
          </SectionBody>
          <SectionDivider isDay={isDay} />
          <SocialButtons>
            <SocialIcon url='https://www.twitter.com/morningcd'/>
            <SocialIcon url='https://www.instagram.com/morningcd'/>
            <SocialIcon url={MORNING_CD_SPOTIFY} />
            <SocialIcon url='https://www.github.com/zhammer/morning-cd' />
          </SocialButtons>
        </ModalBody>
      </Modal>
    </>
  );
};

export default HelpModal;
