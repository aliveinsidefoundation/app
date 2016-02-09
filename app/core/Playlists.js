/*
 * Music
 * new Music({clientId, token})
 * getTracks({years:[1990-1991], market: 'AR', limit: 5, q: '']})
 */
import {Client, TrackHandler, PlaylistHandler, ArtistHandler, UserHandler} from 'spotify-sdk';

export default class Spotify {
  constructor(spotify = {client: '', token: ''}) {
    this.client = Client.instance;
    this.client.settings = {};
    this.track = new TrackHandler();
    this.artist = new ArtistHandler();
    // let user = new UserHandler();
    // let playlist = new PlaylistHandler();
  }

  getTracks(op = {}) {
    return this.track.search(op.q, { limit: op.limit, market: op.market });
  }

  getArtists(op = {}) {
    return this.artist.search(`${op.q}`, { limit: op.limit, market: op.market });
  }

  ages(year) {
    return {
      child: (year + 10) + '-' + (year + 15),
      teenager: (year + 16) + '-' + (year + 20),
      adult: (year + 21) + '-' + (year + 40)
    };
  }

  makePlaylist(q, age) {
    this.getTracks(
      {q: `artist:${q11.artist.name} year: ${this.ages(age).child}`, limit: 5, market: 'US'}
    ).then(response => {
      console.log(response);
    });
    // q.q9 add song
    // q.q11 -> search 5 top tracks from artist in child, search 15 more in this age
  }
}
