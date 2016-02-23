import Spotify from '../core/Spotify';
import history from './../utils/history';
import * as appActions from './app';

export function create(songs) {
  return {
    type: 'ADD_SONGS',
    songs: songs
  };
}

export function createPlaylist(answers, year) {
  return dispatch => {
    let spotify = new Spotify('b7e5e8676be84916b431c98d51b85d5c', '5176ca36c9964509a82916d65aefc719');
    spotify.makePlaylist(answers, year).then(collectionTracks => {
      dispatch(create(collectionTracks));
      history.get().push('/playlist');
    });
  };
}

export function remove(id) {
  return {
    type: 'REMOVE_SONG',
    id: id
  };
}

export function appendSongs(index, songs) {
  return {
    type: 'APPEND_SONGS',
    index: index,
    songs: songs
  };
}

export function addFive(id, index) {
  return dispatch => {
    let spotify = new Spotify('b7e5e8676be84916b431c98d51b85d5c', '5176ca36c9964509a82916d65aefc719');
    spotify.getTopTracksByArtist(id).then(collectionTracks => {
      dispatch(appendSongs(index, collectionTracks.splice(5)));
    });
  };
}

export function addTrack(track) {
  return {
    type: 'ADD_SONG',
    track: track
  };
}

export function makePlaylist(artist) {
  return dispatch => {
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.makePlaylistBasedSong(artist).then(collectionTracks => {
      console.log('here')
      dispatch(appActions.loadingOff());
      dispatch(create(collectionTracks));
    });
  };
}
