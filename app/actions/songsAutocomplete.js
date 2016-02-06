

export function searchError(data) {
  return {
    type: 'autocomplete_fail',
    isLoading: false,
    data
  };
}

export function searchSuccess(data) {
  return {
    type: 'autocomplete_success',
    isLoading: false,
    data
  };
}

export function searchAtemp(data) {
  return {
    type: 'autocomplete_atemp',
    isLoading: data
  };
}

export function search() {
  return (dispatch) => {
    // dispatch(searchAtemp(true));
    const suggestions = [{ id: 1, name: 'joel' }, { id: 2, name: 'marcos' }, { id: 3, name: 'julio' }];
    dispatch(searchSuccess(suggestions));
  }
}
