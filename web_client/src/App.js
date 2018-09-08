import React, { Component } from 'react';
import DayFrame from 'scenes/DayFrame';
import QuestionPage from 'scenes/QuestionPage';

class App extends Component {
  render() {
    return (
      <div>
        <DayFrame>
          <QuestionPage />
        </DayFrame>
      </div>
    );
  }
}

export default App;
