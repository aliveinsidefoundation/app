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
                <span className="txt-intro-title">Welcome to the Alive Inside App!</span>
                <span className="txt-intro-title-2">It's time to wake memories!</span>
                <span className="txt-intro">Give your Elders human connection and Music!</span>
                <a className="button create-playlist" href="/#/questionnaire"><i className="icon-music"></i> CREATE A PLAYLiST</a>
              </div>
              <img src="/images/home-intro.jpg"/>
            </div>
            <div className="home-how">
              <div className="how-container">
                <div className="how-title">How it works</div>
                <div className="how-item">
                  <img src="/images/numbers-01.png"/>
                  <span>INTERVIEW YOUR ELDER</span>
                  <p>Sit down with your elder and walk through our simple interview. Record their answers and we will do the rest!</p>
                </div>
                <div className="how-item">
                  <img src="/images/numbers-02.png"/>
                  <span>REVIEW THE PLAYLIST</span>
                  <p>Your answers will magically create a list of songs that are meaningful to your elder. As you listen to the songs with your elder, you can record their stories and reactions.</p>
                </div>
                <div className="how-item">
                  <img src="/images/numbers-03.png"/>
                  <span>SAVE TO SPOTIFY</span>
                  <p>You can save the playlist to Spotify for easy access and editing. With a Premium Spotify account, you can even access the playlist offline. If you are a youth outreach group-</p><a href="http://www.aliveinside.org/outreach">we can help!</a>
                </div>
              </div>
            </div>
            <div className="how-whats">
              <div className="whats-item back-blue">
                <img src="/images/brain-01.png"/>
                <span>What is The Alive Inside App?</span>
                <p>The Alive Inside App is a tool to help you discover the music that connects your elder to their deepest emotions and identity. You will re-awaken Aliveness with your presence and caring energy.</p>
              </div>
              <div className="whats-item back-organge">
                <img src="/images/brain-02.png"/>
                <span>Why music?</span>
                <p>Music affects the brain and body unlike anything else.It accesses multiple parts of the brain, and miraculously stays strong, almost to the  end. Music and Human Connection are unparalleled and often ignored tools for restoring memory and identity.</p>
              </div>
            </div>
            <div className="home-message">
              <span>Support the movement of aliveness!</span>
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
