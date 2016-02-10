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
    //
    this.playlist = [];
    this.promises = [];
  }

  getTrack(id) {
    return this.track.get(id);
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

  getTopFiveArtist(artist, years, cant = 5) {
    this.promises.push(this.getTracks({
      q: `artist:${artist} year:${years}`, limit: cant, market: 'US'
    }).then(tracks => {
      return tracks.map(track => {
        return track;
      });
    }));
  }

  removeDuplicates(list) {
    return list.filter((a, b) => {
      return a.id !== b.id;
    });
  }

  orderByPopularity(list) {
    return list.sort((a, b) => {
      return a.popularity - b.popularity;
    }).reverse();
  }


  makePlaylist(q, age) {
    return new Promise((resolve) => {
      let { q11, q12, q13 } = q;
      let list = [];

      if (q11) {
        q11.age = this.ages(age).child;
        list.push(q11);
      }

      if (q12) {
        q12.age = this.ages(age).teenager;
        list.push(q12);
      }

      if (q13) {
        q13.age = this.ages(age).adult;
        list.push(q13);
      }

      list.map(listKey => {
        Object.keys(listKey).map(key => {
          if (key !== 'age') {
            this.getTopFiveArtist(listKey[key].artist.name, listKey.age);

            listKey[key].artist.relatedArtists().then(relatedArtists => {
              relatedArtists = relatedArtists.slice(0, 5);
              relatedArtists.map(artist => {
                return this.getTopFiveArtist(artist.name, this.ages(age).child);
              });
            });
          }
        });
      });

      if (q.q20) {
        Object.keys(q.q20).map(key => {
          this.getTopFiveArtist(q.q20[key].name, this.ages(age).child, 2);
          this.getTopFiveArtist(q.q20[key].name, this.ages(age).teenager, 2);
        });
      }

      Object.keys(Object.assign({}, q.q9, q.q21, q.q22, q.q23, q.q24)).map(id => {
        this.promises.push(this.getTrack(id));
      });

      setTimeout(() => {
        Promise.all(this.promises).then(resp => {
          this.playlist = [].concat.apply([], resp);
          this.playlist = this.removeDuplicates(this.playlist);
          resolve(this.playlist);
        });
      }, 3000);
    });
  }
}
