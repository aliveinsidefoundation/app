import React from 'react';

import Header from '../../components/Header';

import '!style!css!sass!./index.scss';

class Playlist extends React.Component {
  render() {
    return (<div>
              <Header/>
              <div id="container" className="playlist">
                <div className="wrap-container">
                  <h2>[name]’s Playlist [dob1938]</h2>
                  <ul>
                    <li>
                      <div className="song">
                        <div className="open">></div>
                        <div className="play">Play</div>
                        <div className="name">Noche loca</div>
                        <div className="artist">Marama</div>
                        <div className="buttons"></div>
                      </div>
                      <div className="notes">
                        <textarea></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>);
  }
}

export default Playlist;
