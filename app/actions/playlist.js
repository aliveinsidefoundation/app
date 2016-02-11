import Spotify from '../core/Spotify';
import history from './../utils/history';

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
