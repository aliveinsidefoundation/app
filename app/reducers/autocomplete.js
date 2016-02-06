const initialState = {
  isLoading: false,
  songs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'autocomplete_success':
      return action.data;
    default:
      return state;
  }
};
