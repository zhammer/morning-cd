import React, { Component } from 'react';
import DayFrame from 'scenes/DayFrame';
import QuestionPage from 'scenes/QuestionPage';
import SubmitSongPage from 'scenes/SubmitSongPage';

class App extends Component {
  state = {
    selectedSong: null
  }

  handleSongSelected = song => { this.setState({ selectedSong: song }); }

  render() {
    const { selectedSong } = this.state;
    return (
      <div>
        <DayFrame>
          {!selectedSong ? <QuestionPage onSongSelected={this.handleSongSelected} />
          : <SubmitSongPage song={selectedSong} />}
        </DayFrame>
      </div>
    );
  }
}

export default App;
