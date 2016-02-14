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
      audios: [],
      comments: {}
    };

    this._stopAll = this._stopAll.bind(this);
    this._add = this._add.bind(this);
    this._commentsChange = this._commentsChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.songs.length) {
      this.props.history.push('/');
    }
  }

  render() {
    let { songs, actions, app } = this.props;
    return (<div>
              <Header/>
              <div id="container" className="playlist">
                <div className="wrap-container">
                  <h2>{app.name}’s Playlist [{app.name}{app.year}]</h2>
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

  _commentsChange(data) {
    let comments = this.state.comments;
    comments[data.id] = data;
    this.setState({
      comments
    });
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
    actions: bindActionCreators(playlistActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
