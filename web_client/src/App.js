import React, { Component } from 'react';
import DayFrame from 'scenes/DayFrame';
import QuestionPage from 'scenes/QuestionPage';
import SubmitSongPage from 'scenes/SubmitSongPage';
import WindLoadingPage from 'scenes/WindLoadingPage';

class App extends Component {
  state = {
    selectedSong: null,
    loading: false
  }

  handleSongSelected = song => { this.setState({ selectedSong: song }); }

  handleSongSubmitted = ({ name, note }) => {
    const song = this.state.selectedSong;
    console.log(song.name + ' submitted by ' + name + ' with note: ' + note);
  }

  render() {
    const { loading, selectedSong } = this.state;
    return (
      <div>
        <DayFrame>
          {loading ? <WindLoadingPage /> : !selectedSong ? <QuestionPage onSongSelected={this.handleSongSelected} />
          : <SubmitSongPage song={selectedSong} onSongSubmitted={this.handleSongSubmitted} />}
        </DayFrame>
      </div>
    );
  }
}

export default App;
