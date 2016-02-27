let initialstate = {
  name: '',
  year: '',
  loading: false
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case 'APP_SET_NAME':
      state.name = action.name;
      return state;
    case 'APP_SET_YEAR':
      state.year = action.year;
      return state;
    case 'LOADING':
      state.loading = action.loading;
      return state;
    default:
      return state;
  }
};
