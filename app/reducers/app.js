let initialstate = {
  name: 'joel',
  year: '1989'
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case 'APP_SET_NAME':
      state.name = action.name;
      return state;
    case 'APP_SET_YEAR':
      state.year = action.year;
      return state;
    default:
      return state;
  }
};
