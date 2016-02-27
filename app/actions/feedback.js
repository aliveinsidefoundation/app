import * as appActions from './app';
import history from './../utils/history';

let sendEmail = (data) => {
  return dispatch => {
    fetch('http://fs000430.ferozo.com/aif/feedback.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      dispatch(appActions.loadingOff());
      history.get().push('/');
    });
  };
};

export function end(answers, tracks) {
  return (dispatch) => {
    dispatch(appActions.loadingOn());
    dispatch(sendEmail(answers, tracks));
  };
}
