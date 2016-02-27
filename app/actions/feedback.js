import * as appActions from './app';

let sendEmail = (data) => {
  return dispatch => {
    fetch('http://fs000430.ferozo.com/aif/feedback.php', {
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
    dispatch(appActions.loadingOn());
    dispatch(sendEmail(answers));
  };
}
