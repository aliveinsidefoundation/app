'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src: this.props.source,
      elem: null,
      isPlaying: false,
      isLoading: false
    };
    this.playerEvent = {};
    this._play = this._play.bind(this);
    this._stop = this._stop.bind(this);
  }

  componentDidMount() {
    this.audioTag = ReactDOM.findDOMNode(this.refs.audio);
    this.props.ptag(this.audioTag);

    this.playerEvent.loadStart = () => {
      this.setState({
        isLoading: true
      });
    };

    this.playerEvent.loadEnd = () => {
      this.setState({
        isLoading: false
      });
    };

    this.playerEvent.isPlaying = () => {
      this.setState({
        isPlaying: false
      });
    };

    this.audioTag.addEventListener('ended', this.playerEvent.isPlaying);
    this.audioTag.addEventListener('pause', this.playerEvent.isPlaying);
    this.audioTag.addEventListener('loadeddata', this.playerEvent.loadEnd);
    this.audioTag.addEventListener('loadstart', this.playerEvent.loadStart);
    this.audioTag.addEventListener('suspend', this.playerEvent.loadEnd);
  }

  componentWillUnmount() {
    this.audioTag.removeEventListener('ended', this.playerEvent.isPlaying);
    this.audioTag.removeEventListener('pause', this.playerEvent.isPlaying);
    this.audioTag.removeEventListener('loadeddata', this.playerEvent.loadEnd);
    this.audioTag.removeEventListener('loadstart', this.playerEvent.loadStart);
    this.audioTag.removeEventListener('suspend', this.playerEvent.loadStart);
  }

  _play() {
    this.props.stopAll.apply();
    this.audioTag.play();
    this.setState({
      isPlaying: true
    });
  }

  _stop() {
    this.audioTag.pause();
    this.setState({
      isPlaying: false
    });
  }

  render() {
    return (
      <div>
        { !this.state.isPlaying && !this.state.isLoading ?
          <img src="/images/volume.svg" onClick={this._play}/> : null
        }
        { this.state.isPlaying && !this.state.isLoading ?
          <img src="/images/pause.svg" onClick={this._stop}/> : null
        }
        { this.state.isLoading ?
          <img src="/images/tail-spin.svg" className="player-loading"/> : null
        }
        <audio ref="audio" src={this.props.source} preload="none"/>
      </div>
      );
  }
}

export default Player;
