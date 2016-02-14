import React, { Component } from 'react';

import Player from '../Player';

import '!style!css!sass!./index.scss';

export default class TrackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this._open = this._open.bind(this);
    this._onPlus = this._onPlus.bind(this);
    this._onRemove = this._onRemove.bind(this);
    this._onReload = this._onReload.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (<div className={'trackitem note_' + this.state.open}>
              <div className="item">
                <div className="open" onClick={this._open}>></div>
                <div className="player">
                  <Player
                    source={this.props.track.preview_url}
                    ptag={this.props.audio}
                    stopAll={this.props.stopAll}
                  />
                </div>
                <div className="name" onClick={this._open}>{this.props.track.name}</div>
              </div>
              <div className="item">
                <div className="artist" onClick={this._open}>{this.props.track.artists[0].name}</div>
                <div className="buttons">
                  <span onClick={this._onPlus}>+5</span>
                  <i onClick={this._onRemove} className="icon-cross"></i>
                  <i onClick={this._onReload} className="icon-reload"></i>
                </div>
              </div>
              <div className="notes">
                <textarea
                  onChange={this._onChange}
                  placeholder="Record any memories that your elder noted during this song"
                >
                </textarea>
              </div>
            </div>);
  }

  _open() {
    this.setState({
      open: !this.state.open
    });
  }

  _onPlus() {
    this.props.onPlus();
  }

  _onRemove() {
    this.props.onRemove();
  }

  _onReload() {
    this.props.onReload();
  }

  _onChange(ev) {
    this.props.onChange({
      id: this.props.track.id,
      name: this.props.track.name,
      comment: ev.target.value
    });
  }

}
