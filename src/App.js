import React, { Component } from 'react';
import './App.scss';

import Keyboard from './components/Keyboard';
import TrackDeck from './components/TrackDeck';

let tracks = [
  {
    clips: [
      { id: 'fafsdf' },
      { id: 'fafsdf' },
      { id: 'fafsdf' },
      { id: 'fafsdf' },
      { id: 'fafsdf' },
      { id: 'fafsdf' },
    ],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
  {
    clips: [],
    inputs: [],
    instruments: []
  },
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks:      tracks,
      inputs:      [
        { name: 'Computer Keyboard', id: '442fa' },
        { name: 'MPD26 MIDI Controller', id: '222r' }
      ],
      instruments: [
        { name: 'PolySynth', id: '2429f' },
        { name: 'MonoSynth', id: '23591' },
      ]
    }
  }

  getChildContext() {
    return {
      addInput: (inputs) => {
        this.setState({ inputs });
      },
      inputs: this.state.inputs,
      instruments: this.state.instruments
    };
  }

  render() {
    return (
      <div className="App">
        <TrackDeck tracks={this.state.tracks} />
        <Keyboard />
      </div>
    );
  }
}

App.childContextTypes = {
  addInput:    React.PropTypes.func,
  inputs:      React.PropTypes.array,
  instruments: React.PropTypes.array,
};

export default App;
