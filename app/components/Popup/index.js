import React, { Component } from 'react';

import '!style!css!sass!./index.scss';

export default class Popup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup-container">
        <div className="popup">
          <p className="title">Are you sure you want to make a new playlist out of {this.props.track.name} by {this.props.track.artists[0].name}?</p>
          <p className="message">Creating a new playlist will erase the current playlist. Export this playlist to Spotify if you want to save it before continuing.</p>
          <div className="button create-playlist" onClick={this.props.continue}>
            CREATE NEW PLAYLiST
          </div>
          <div className="button cancel" onClick={this.props.cancel}>
            CANCEL
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      );
  }
}
