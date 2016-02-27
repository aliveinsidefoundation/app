export function setName(name) {
  return {
    type: 'APP_SET_NAME',
    name: name
  };
}

export function setYear(year) {
  return {
    type: 'APP_SET_YEAR',
    year: year
  };
}

export function loadingOn() {
  return {
    type: 'LOADING',
    loading: true
  };
}

export function loadingOff() {
  return {
    type: 'LOADING',
    loading: false
  };
}

export function showFeedback() {
  return {
    type: 'SHOW_FEEDBACK',
    show: true
  };
}
