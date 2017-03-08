import React, { Component } from 'react';
import './Track.scss';

import Clip from './Clip';

class Track extends Component {
  render() {
    return (
      <div className="track">
        <h4>{this.props.id}</h4>
        <div className="clips">
          {
            this.props.clips.map((clip, index) => {
              return (
                <Clip key={`${clip.id}-${index}`} />
              );
            })
          }
        </div>
        <div className="controls">
          <div className="instruments">
            <label htmlFor="instruments">Instruments</label>
            <select id="instruments" multiple={true}>
              {
                this.context.instruments.map((instrument, index) => {
                  return <option key={`${this.props.id}-${index}`} value={instrument.id}>{instrument.name}</option>;
                })
              }
            </select>
          </div>
          <div className="inputs">
            <label htmlFor="inputs">Inputs</label>
            <select id="inputs" multiple={true}>
              {
                this.context.inputs.map((input, index) => {
                  return <option key={`${this.props.id}-${index}`} value={input.id}>{input.name}</option>;
                })
              }
            </select>
          </div>
        </div>
      </div>
    );
  }
}

Track.contextTypes = {
  inputs:      React.PropTypes.array,
  instruments: React.PropTypes.array
};

export default Track;
