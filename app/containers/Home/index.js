import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import historyHandler from './../../utils/history';

import '!style!css!sass!./index.scss';

class Home extends React.Component {

  componentDidMount() {
    historyHandler.set(this.props.history);
  }

  render() {
    return (
      <div>
        <Header/>
        <div id="container" className="home">
          <div className="wrap-container">
            <div className="home-intro">
              <div className="intro-txt">
                <span className="txt-intro ">Welcome to the ALIVE INSIDE APP...!</span>
                <span className="txt-intro-title-2"></span>
                <span className="txt-intro2 ">Give your Elders the Music and Connection they need!</span>
                <a className="button create-playlist" href="/#/questionnaire"><i className="icon-music"></i> CREATE A SongList</a>
              </div>
              <img src="/images/home-intro.jpg"/>
            </div>
            <div className="home-how">
              <div className="how-container">
                <div className="how-title">How it works</div>
                <div className="how-item">
                  <img src="/images/numbers-01.png"/>
                  <span>INTERVIEW YOUR ELDER</span>
                  <p>Sit down with your elder and do our simple interview. Record their answers and let the APP do the rest!</p>
                </div>
                <div className="how-item">
                  <img src="/images/numbers-02.png"/>
                  <span>REVIEW THE SONGLIST</span>
                  <p>Your answers magically create a list of songs from your elder's life. You can listen to the songs and edit the list, and record your elder's stories and reactions.</p>
                </div>
                <div className="how-item">
                  <img src="/images/numbers-03.png"/>
                  <span>SAVE TO SPOTIFY</span>
                  <p>The list saves to Spotify for easy access and editing. With a Premium Spotify account, you can access the music offline. Let's inspire a million kids to-</p><a href="https://www.aliveinside.org/movement/">help a million elders!</a>
                </div>
              </div>
            </div>
            <div className="how-whats">
              <div className="whats-item back-blue">
                <img src="/images/brain-01.png"/>
                <span>What is The Alive Inside App?</span>
                <p>The Alive Inside App is a free music tool to find your elder's deepest memory music. With the App and your caring energy you can wake a mind and heart.</p>
              </div>
              <div className="whats-item back-organge">
                <img src="/images/brain-02.png"/>
                <span>Why music?</span>
                <p>Music affects the brain and body unlike anything else. It accesses multiple parts of the brain, and miraculously stays strong, almost to the  end. Music and Human Connection can restore memory and identity!</p>
              </div>
            </div>
            <div className="home-message">
              <span>Support our Movement!</span>
              <a className="button create-playlist" href="http://www.aliveinside.org/donate/" target="_blank">DONATE NOW</a>
            </div>
          </div>
        </div>
        <div className="social-networks-container">
          <div className="social-networks">
            <a href="https://plus.google.com/103387524101319577826/posts"><img src="/images/google-icon.png"/></a>
            <a href="https://www.facebook.com/BeAliveInside"><img src="/images/facebook-icon.png"/></a>
            <a href="https://twitter.com/AliveInsideFilm"><img src="/images/twitter-icon.png"/></a>
          </div>
        </div>
        <Footer/>
      </div>
      );
  }
}

export default Home;
