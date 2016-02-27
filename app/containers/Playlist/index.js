import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spotify from '../../core/Spotify';

import Header from '../../components/Header';
import TrackItem from '../../components/TrackItem';
import Multiselect from '../../components/Multiselect';
import Popup from '../../components/Popup';
import Loading from '../../components/Loading';

import * as playlistActions from '../../actions/playlist';
import * as appActions from '../../actions/app';


import '!style!css!sass!./index.scss';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audios: [],
      comments: {},
      showPopup: false,
      help: true,
      currentTrack: null
    };

    this._stopAll = this._stopAll.bind(this);
    this._add = this._add.bind(this);
    this._commentsChange = this._commentsChange.bind(this);
    this._popupContinue = this._popupContinue.bind(this);
    this._popupCancel = this._popupCancel.bind(this);
    this._save = this._save.bind(this);
    this.spotify = new Spotify();
  }

  componentDidMount() {
    if (!this.props.songs.length) {
      this.props.history.push('/');
    }
  }

  help() {
    let show = () => {
      this.setState({
        help: !this.state.help
      });
    };
    return (
      <div className={'help-playlist-container open_'+this.state.help}>
        <div className="help-playlist">
          {
           this.state.help ?
           <div className="wrap-container">
            <span className="title">WHAT HAPPENS NOW:</span>
            <span>1 - Listen to the playlist with [elder’s name] and remove any unwanted songs and add any additional songs.</span>
            <span>2 - Use the note section under each song to note [elder’s name] response to that song.</span>
            <span>3 - Export the playlist to Spotify! Don’t worry if you don’t have an account, you’ll be able to create one. A text version of this playlist has also been emailed you.</span>
            <div className="button got-it" onClick={show}>GOT IT!</div>
          </div> :
          ''
          }
        </div>
        <div className="wrap-container">
          <div className="instructions" onClick={show}><span className="cross">+</span> Instructions</div>
        </div>
      </div>
      );
  }

  render() {
    let { songs, actions, app } = this.props;
    return (<div>
              { app.loading ? <Loading/> : ''}
              { this.state.showPopup ?
                <Popup
                  continue={this._popupContinue}
                  cancel={this._popupCancel}
                  track={this.state.currentTrack}
                /> : ''}
              <Header/>
              {this.help()}
              <div id="container" className="playlist">
                <div className="wrap-container">
                  <h2>{app.name}’s Playlist [{app.name}{app.year}]</h2>
                  <div>
                    <div className="form-input">
                      <Multiselect
                        selected="disabled"
                        loadOptions={this._loadOptions.bind(this)}
                        ref="q9"
                        name="q9"
                        onChange={this._onChange.bind(this)}
                        />
                    </div>
                  </div>
                  <ul>
                    <li className="titles">
                      <div className="list-title">Song</div>
                      <div className="list-title">Artist</div>
                    </li>
                    {
                      songs.map((item, index) => {
                        return (
                          <li key={item.id}>
                            <TrackItem
                              track={item}
                              onChange={ this._commentsChange }
                              onRemove={() => {actions.remove(item.id)}}
                              onPlus={() => actions.addFive(item.artists[0].id, index)}
                              onReload={() => {this._showPopup(item)}}
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
              <div className="footer-playlist">
                <div className="button save" onClick={this._save}>SAVE TO SPOTIFY</div>
                { app.showFeedback ? <a href="/#/feedback" className="end">Feedback</a> : ''}
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

  _commentsChange(data) {
    let comments = this.state.comments;
    comments[data.id] = data;
    this.setState({
      comments
    });
  }

  _loadOptions(input, callback) {
    if (input.length > 3) {
      this.spotify.getTracks({ market: 'US', limit: 5, q: input })
        .then(response => {
          return response.map(item => {
            return {
              id: item.id,
              name: `${item.name} - ${item.artists[0].name}`,
              artist: item.artists.first(),
              track: item
            };
          });
        })
        .then((response) => {
          callback(null, response);
        });
    }
  }

  _onChange(track) {
    let tracks = Object.keys(track);
    this.props.actions.addTrack(track[tracks[tracks.length - 1]].track);
  }

  _showPopup(track) {
    this.setState({
      currentTrack: track,
      showPopup: true
    });
  }

  _popupContinue() {
    this.setState({
      showPopup: false
    });
    this.props.actions.makePlaylist(this.state.currentTrack.artists[0].id);
  }

  _popupCancel() {
    this.setState({
      showPopup: false
    });
  }

  _save() {
    this.setState({
      showPopup: false
    });
    this.props.actions.savePlaylist(this.props.songs, `${this.props.app.name}${this.props.app.year}`);
  }

}

let mapStateToProps = (state) => {
  return {
    songs: state.playlist,
    app: state.app
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(playlistActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
