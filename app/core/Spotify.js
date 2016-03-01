/*
 * Music
 * new Music({clientId, token})
 * getTracks({years:[1990-1991], market: 'AR', limit: 5, q: '']})
 */
import {Client, TrackHandler, PlaylistHandler, ArtistHandler, UserHandler} from 'spotify-sdk';
import appConfig from 'appConfig';

export default class Spotify {
  constructor(spotify = {client: '', token: ''}) {
    this.client = Client.instance;
    this.client.settings = {
      clientId: appConfig.SPOTIFY_CLIENT,
      secretId: appConfig.SPOTIFY_TOKEN,
      scopes: 'playlist-modify-public playlist-modify-private',
      redirect_uri: appConfig.SPOTIFY_REDIRECT
    };
    this.track = new TrackHandler();
    this.artist = new ArtistHandler();
    this.user = new UserHandler();
    this.playlistHandler = new PlaylistHandler();
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

  getTopTracksByArtist(id) {
    return this.artist.get([id]).then(artists => {
      return artists[0].topTracks({country: 'US'}).then(tracks => {
        return tracks.map(track => {
          return track;
        });
      });
    });
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

  alternate(list) {
    let index = 0;
    let list_size = list.length;
    let process = (list_process) => {
      // Search the next item different, remove and return this.
      let serchNextDifferent = (number) => {
        for (let i = index + 1; i <= list_size; i++) {
          if (list_process[i] && list_process[i].artists.first().id !== number) {
            return list_process.splice(i, 1)[0];
          }
        }
      };
      // Search the next item different, remove and return this.
      let serchPrevDifferent = (number, prevIndex) => {
        for (let i = prevIndex - 1; i >= 0; i--) {
          if (list_process[i] &&
              list_process[i].artists.first().id !== number &&
              list_process[i].artists.first().id !== list_process[prevIndex].artists.first().id &&
              number !== list_process[i - 1].artists.first().id &&
              i)
          {
            return list_process.splice(i, 1)[0];
          }
        }
      };
      // Check if the current item and the prev are equals
      if (list_process[index - 1] &&
          list_process[index - 1].artists.first().id === list_process[index].artists.first().id)
      {
        let next = serchNextDifferent(list_process[index].artists.first().id);
        if (next) {
          list_process.splice(index, 0, next);
        } else {
          let prev = serchPrevDifferent(list_process[index].artists.first().id, index);
          if (prev) {
            list_process.splice(index - 1, 0, prev);
          } else {
            list_process.push(list_process.splice(index, 1)[0]);
          }
        }
      }
      // next
      if (list_size - 1 !== index) {
        index++;
        return process(list_process);
      } else {
        return list_process;
      }
    };
    return process(list);
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
          console.log(resp)
          this.playlist = [].concat.apply([], resp);
          this.playlist = this.alternate(this.orderByPopularity(this.removeDuplicates(this.playlist)));
          resolve(this.playlist);
        });
      }, 3000);
    });
  }

  makePlaylistBasedSong(artistId) {
    return new Promise((resolve) => {
      let total;
      let trackList = [];
      this.artist.get([artistId]).then(artists => {
        artists.first().relatedArtists().then((relatedArtists) => {
          relatedArtists = relatedArtists.slice(0, 10);
          if (relatedArtists.length) {
            relatedArtists.push(artists.first());
            for (let i = relatedArtists.length - 1; i >= 0; i--) {
              total = relatedArtists.length - 1;
              relatedArtists[i].topTracks({ country: 'US' }).then((tracks) => {
                if (tracks.length) {
                  for (let e = tracks.length - 1; e >= 0; e--) {
                    trackList.push(tracks[e]);
                    if (e === 0) {
                      total -= 1;
                      if (total === 0) {
                        resolve(this.alternate(this.orderByPopularity(trackList)));
                      }
                    }
                  }
                } else {
                  total -= 1;
                }
              });
              //
            }
          }
        });
      });
    });
  }

  save(tracks, playlistName) {
    return new Promise((resolve) => {
      this.client.login((url) => {
        window.open(
          url,
          'Spotify',
          'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=400,height=500'
        );
        // :D
        window.addEventListener('storage', (data) => {
          if (data.key === 'magic_token') {
            this.client.token = data.newValue;

            this.user.me().then((userEntity) => {
              this.playlistHandler.create(userEntity.id, playlistName, false).then((myPlaylist) => {
                myPlaylist.addTrack(tracks).then(() => {
                  resolve(myPlaylist);
                });
              }).catch(() => {
                resolve({ ok: false });
              });
            }).catch(() => {
              resolve({ ok: false });
            });
          }
        });
      });
    });
  }

}
