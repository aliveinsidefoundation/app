import Spotify from '../core/Spotify';
import history from './../utils/history';
import * as appActions from './app';

export function create(songs) {
  return {
    type: 'ADD_SONGS',
    songs: songs
  };
}

export function sendEmail(data, answers, year) {
  let newData = {};
  data.map((track, index) => {
    newData[index] = {
      track: track.name,
      artist: track.artists[0].name
    };
  });
  fetch('http://fs000430.ferozo.com/aif/playlist.php', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ tracks: newData, answers: answers, year: year })
  });
}

export function createPlaylist(answers, year) {
  return dispatch => {
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.makePlaylist(answers, year).then(collectionTracks => {
      dispatch(create(collectionTracks));
      dispatch(appActions.loadingOff());
      sendEmail(collectionTracks, answers, year);
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
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.getTopTracksByArtist(id).then(collectionTracks => {
      dispatch(appActions.loadingOff());
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
      dispatch(appActions.loadingOff());
      dispatch(create(collectionTracks));
    });
  };
}

export function savePlaylist(tracks, name) {
  return dispatch => {
    dispatch(appActions.loadingOn());
    let spotify = new Spotify();
    spotify.save(tracks, name).then(res => {
      dispatch(setPlaylistURI(res.external_urls.spotify));
      dispatch(appActions.loadingOff());
      dispatch(showPopupSuccess());
    });
  };
}

export function showPopupError() {
  return {
    type: 'POPUP_SHOW_ERROR'
  };
}

export function closePopupError() {
  return {
    type: 'POPUP_CLOSE_ERROR'
  };
}

export function showPopupSuccess() {
  return {
    type: 'POPUP_SHOW_SUCCESS'
  };
}

export function closePopupSuccess() {
  return {
    type: 'POPUP_CLOSE_SUCCESS'
  };
}

export function setPlaylistURI(uri) {
  return {
    type: 'PLAYLIST_SET_URI',
    uri: uri
  };
}
