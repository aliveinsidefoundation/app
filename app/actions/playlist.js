export function remove(id) {
  return {
    type: 'REMOVE_SONG',
    id: id
  };
}

export function create(answers) {
  return {
    type: 'CREATE_PLAYLIST',
    answers: answers
  };
}
