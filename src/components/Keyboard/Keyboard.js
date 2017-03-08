import React, { Component } from 'react';
import ComputerKeyboard from '../../inputs/ComputerKeyboard';
import './Keyboard.scss';

import Synth from '../../instruments/Synth';

import Key from './Key';

import KEY_NOTES from '../../key-notes.json';

class Keyboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      keysDown: []
    };
  }

  componentWillMount() {
    this.input = new ComputerKeyboard();
    this.input.connect(Synth);

    this.input.onKeyDown(keydown => {
      if (this.state.keysDown.indexOf(keydown) === -1) {
        let keysDown = Object.assign([], this.state.keysDown);
        keysDown.push(keydown);

        this.setState({ keysDown });
      }
    });

    this.input.onKeyUp(keyup => {
      let keysDown = this.state.keysDown.filter(keydown => { return keydown !== keyup });

      this.setState({ keysDown });
    });
  }

  handleOnMouseDown(e, note) {

    Synth.attack(`${note}${3}`);
  }

  render() {
    return (
      <div className="keyboard">
        {
          Object.keys(KEY_NOTES).map((key, index) => {
            let keyNote = KEY_NOTES[key];
            let isPressed = this.state.keysDown.indexOf(key) > -1;

            return (
              <Key
                key={`${keyNote.note}-${index}`}
                onMouseDown={this.handleOnMouseDown.bind(this)}
                note={keyNote.note}
                posModifier={keyNote.posModifier}
                isPressed={isPressed} />
            );
          })
        }
      </div>
    );
  }
}

Keyboard.contextTypes = {
  addInput: React.PropTypes.func,
  inputs:   React.PropTypes.array
};

export default Keyboard;
