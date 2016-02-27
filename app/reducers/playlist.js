const initState = [];

let dedup = (arr) => {
  let hashTable = {};

  return arr.filter(function (el) {
    let key = JSON.stringify(el);
    let match = Boolean(hashTable[key]);

    return (match ? false : hashTable[key] = true);
  });
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_SONGS':
      return action.songs;
    case 'REMOVE_SONG':
      return state.filter(track => {
        return track.id !== action.id;
      });
    case 'APPEND_SONGS':
      let newArray = state.slice();
      newArray.splice(action.index + 1, 0, ...action.songs);
      return dedup(newArray);
    case 'ADD_SONG':
      let songs = state.slice();
      songs.push(action.track);
      return songs;
    default:
      return state;
  }
};
