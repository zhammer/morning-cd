import React, { Component } from 'react';
import SongSubmitForm from './SongSubmitForm';
import withRandomProp from './withRandomProp';
import artistNames from './artistNames';

class SongSubmitFormContainer extends Component {
  state = {
    nameValue: '',
    noteValue: ''
  }

  handleNameChanged = event => this.setState({ 'nameValue': event.target.value });
  handleNoteChanged = event => this.setState({ 'noteValue': event.target.value });
  handleSongSubmitted = () => {
    const formData = this.getFormData();
    this.props.onSongSubmitted(formData);
  }
  getFormData = () => ({ name: this.state.nameValue, note: this.state.noteValue })
  isValid = () => this.state.nameValue.length > 0;

  render = () => (
    <SongSubmitForm nameValue={this.state.nameValue}
                    noteValue={this.state.noteValue}
                    onNameChange={this.handleNameChanged}
                    onNoteChange={this.handleNoteChanged}
                    namePlaceholder={this.props.namePlaceholder}
                    valid={this.isValid()}
                    onSongSubmitted={this.handleSongSubmitted}
                    />
  )
}

const SongSubmitFormContainerWithRandomNamePlaceholder = withRandomProp(
  SongSubmitFormContainer,
  artistNames,
  selected => ({ namePlaceholder: selected })
);

export default SongSubmitFormContainerWithRandomNamePlaceholder;
