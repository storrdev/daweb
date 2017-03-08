import React, { Component } from 'react';
import './TrackDeck.scss';

import Track from './Track';

class TrackDeck extends Component {
  render() {
    return (
      <div className="track-deck">
        {
          this.props.tracks.map((track, index) => {
            return (
              <Track
                key={`track-${index}`}
                id={`track-${index}`}
                clips={track.clips}
                inputs={track.inputs}
                instruments={track.instruments} />
            );
          })
        }
      </div>
    );
  }
}

export default TrackDeck;
