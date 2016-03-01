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
    return (<div>
              <Header/>
              <div id="container" className="home">
                <div className="wrap-container">
                  <div className="home-intro">
                    <div className="intro-txt">
                      <span className="txt-intro-title">Welcome Memory Detective! It's time to start waking memories!</span>
                      <span className="txt-intro">Bring music and identity back to our elders through your human connection and a kick-a playlist curated by you.</span>
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
                        <p>Sit down with an elder and let us walk you through a simple interview. All you need to do is record the answers to the questions that we have for you to ask.</p>
                      </div>
                      <div className="how-item">
                        <img src="/images/numbers-02.png"/>
                        <span>REVIEW THE PLAYLIST</span>
                        <p>The answers to the interview questions will magically create a playlist of songs that are familiar to your elder. As you listen to the songs with your elder, you can record reactions they have to each song.</p>
                      </div>
                      <div className="how-item">
                        <img src="/images/numbers-03.png"/>
                        <span>SAVE TO SPOTIFY</span>
                        <p>You can save the playlist to Spotify for access easily in the future and with a Premium Spotify account, you can even access the playlist offline.</p>
                      </div>
                    </div>
                  </div>
                  <div className="how-whats">
                    <div className="whats-item back-blue">
                      <img src="/images/brain-01.png"/>
                      <span>What is a Memory Detective?</span>
                      <p>You are! As a Memory Detective you are on a memory mission by facilitating an interview with an elder to discover what music they connect with most deeply. You will help your elder re­member their fondest moments and you will do this with your presence and caring energy.</p>
                    </div>
                    <div className="whats-item back-organge">
                      <img src="/images/brain-02.png"/>
                      <span>Why music?</span>
                      <p>Music affects the brain and body unlike anything else it accesses multiple parts of the brain, and miraculously stays strong, almost to the  end. Music and Human Connection are unparalleled and often ignored tools for restoring memory and identity.</p>
                    </div>
                  </div>
                  <div className="home-message">
                    <span>Our goal is to wake memories and also to be "alive inside" together in the here and now.</span>
                    <a className="button create-playlist" href="/#/questionnaire"><i className="icon-music"></i> CREATE A PLAYLiST</a>
                  </div>
                </div>
              </div>
              <div className="social-networks-container">
                <div className="social-networks">
                  <a href="#"><img src="/images/google-icon.png"/></a>
                  <a href="#"><img src="/images/facebook-icon.png"/></a>
                  <a href="#"><img src="/images/twitter-icon.png"/></a>
                  <a href="#"><img src="/images/instagram-icon.png"/></a>
                </div>
              </div>
              <Footer/>
            </div>);
  }
}

export default Home;
