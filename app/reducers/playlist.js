// const initState = [];
const initState = {
  songs: [],
  popupSuccess: false,
  popupError: false,
  uri: null
};

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
      let songs = action.songs;
      return Object.assign({},
        state,
        { songs }
      );
    case 'REMOVE_SONG':
      songs = state.songs.filter(track => {
        return track.id !== action.id;
      });
      return Object.assign({},
        state,
        { songs }
      );
    case 'APPEND_SONGS':
      let newArray = state.songs.slice();
      newArray.splice(action.index + 1, 0, ...action.songs);
      songs = dedup(newArray);
      return Object.assign({},
        state,
        { songs }
      );
    case 'ADD_SONG':
      songs = state.songs.slice();
      songs.push(action.track);
      return Object.assign({},
        state,
        { songs }
      );
    case 'POPUP_SHOW_SUCCESS':
      return Object.assign({},
        state,
        {
          popupSuccess: true
        }
      );
    case 'POPUP_CLOSE_SUCCESS':
      return Object.assign({},
        state,
        {
          popupSuccess: false
        }
      );
    case 'PLAYLIST_SET_URI':
      return Object.assign({},
        state,
        {
          uri: action.uri
        }
      );
    default:
      return state;
  }
};
