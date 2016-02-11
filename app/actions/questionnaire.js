import * as playlist from './playlist';

export function end(answers, year) {
  return (dispatch) => {
    // dispatch(loadingON)
    // dispatch(sendEmail)
    dispatch(playlist.createPlaylist(answers, year));
  };
}
