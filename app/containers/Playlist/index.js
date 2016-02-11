import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../components/Header';
import TrackItem from '../../components/TrackItem';
import * as playlistActions from '../../actions/playlist';

import '!style!css!sass!./index.scss';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: []
    };

    this._stopAll = this._stopAll.bind(this);
    this._add = this._add.bind(this);
  }

  componentDidMount() {
    if (!this.props.songs.length) {
      this.props.history.push('/');
    }
  }

  render() {
    let { songs, actions } = this.props;
    return (<div>
              <Header/>
              <div id="container" className="playlist">
                <div className="wrap-container">
                  <h2>[name]’s Playlist [dob1938]</h2>
                  <ul>
                    <li className="titles">
                      <div className="list-title">Song</div>
                      <div className="list-title">Artist</div>
                    </li>
                    {
                      songs.map(item => {
                        return (
                          <li key={item.id}>
                            <TrackItem
                              track={item}
                              onOpen=''
                              onChange=''
                              onRemove={() => {actions.remove(item.id)}}
                              onPlus=''
                              onReload=''
                              stopAll={this._stopAll}
                              audio={this._add}
                            />
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>);
  }

  _add(item) {
    this.state.audios.push(item);
  }

  _stopAll() {
    this.state.audios.map((item) => {
      item.pause();
    });
  }
}

let mapStateToProps = (state) => {
  return {
    songs: state.playlist
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playlistActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
