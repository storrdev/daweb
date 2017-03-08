import React, { Component } from 'react';
import './Key.scss';

class Key extends Component {
  onMouseDown(e) {
    this.props.onMouseDown(e, this.props.note);
  }

  render() {
    let classes = ['key'];

    let noteClass = `${this.props.note}${this.props.posModifier}`;

    classes.push(noteClass);

    if (this.props.note.indexOf('b') > -1) {
      classes.push('black');
    } else {
      classes.push('white');
    }

    if (this.props.isPressed) {
      classes.push('pressed');
    }

    return (
      <div className={classes.join(' ')} onMouseDown={this.onMouseDown.bind(this)}>
        <div className="note-label">
          { this.props.note }
        </div>
      </div>
    );
  }
}

export default Key;
