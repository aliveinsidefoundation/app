import * as playlist from './playlist';
import * as appActions from './app';

let sendEmail = (data) => {
  return dispatch => {
    fetch('http://fs000430.ferozo.com/aif/index.php', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {

    });
  };
};

export function end(answers, year) {
  return (dispatch) => {
    // appActions.loadingOn();
    dispatch(sendEmail(answers));
    // dispatch(playlist.createPlaylist(answers, year));
  };
}
