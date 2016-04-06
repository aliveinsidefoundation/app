import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '!style!css!sass!./index.scss';

class About extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="container" className="about">
          <div className="about-intro">
            <span className="about-title">ABOUT THE FOUNDATION</span>
          </div>
          <div className="wrap-container">
            <div className="about-foundation">
              <img src="/images/logo.png"/>
              <p>The Alive Inside Foundation is the brain child of documentarian Michael Rossato-Bennett. Working on 'Alive Inside,' a film about music's power to reach into the minds of those living with dementia, his life was changed forever. Fascinated by the power of music and and human connection to heal he created The Alive Inside Foundation. The Foundation is dedicated to expanding human connection and empowering transformational, shared experiences that bring the generations together, awaken memories, and spark aliveness.</p>
              <span>Visit our website for more information on the Foundation.</span>
              <a className="button goto" href="http://aliveinside.org/" target="_blank">GO TO ALIVEINSIDE.ORG</a>
            </div>
            <div className="video">
              <div className="video-container">
                <div className="video-title">The film that started it all…</div>
                <iframe src="https://www.youtube.com/embed/IaB5Egej0TQ" frameBorder="0" allowFullScreen></iframe>
                <img src="/images/sundance.png" className="award"/>
              </div>
            </div>
            <div className="about-message">
              <span>Support the movement of remembering!</span>
              <a className="button donate" href="http://www.aliveinside.org/donate/" target="_blank">DONATE NOW</a>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      );
  }
}

export default About;
