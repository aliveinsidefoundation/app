import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spotify from '../../core/Spotify';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import historyHandler from './../../utils/history';

import * as feedbackActions from '../../actions/feedback';

import '!style!css!sass!./index.scss';

class Feedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answers: {
        fix: false,
        name: this.props.app.name,
        year: this.props.app.year
      }
    };

    this._questionChange = this._questionChange.bind(this);
    this._finish = this._finish.bind(this);
  }

  componentDidMount() {
    historyHandler.set(this.props.history);
  }

  render() {
    return (<div className="feedback-section">
              { this.props.app.loading ? <Loading/> : '' }
              <Header/>
              <div className="wrap-container form-container">
                <span className="title">Your experience</span>
                <div className="feedback-helper">
                  <p>We’d love to hear how this experience was for you. If you wouldn’t mind taking
                   a moment to reflect and respond to the questions below, we’d greatly appreciate
                    it! You were a super memory detective! Keep awakening memories!</p>
                </div>
                <div className="form-input">
                  <label>What song did {this.props.app.name} react most strongly to?</label>
                  <input
                    type="text"
                    ref="q1"
                    name="q1"
                    onChange={this._questionChange}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>What was your favorite story that came from the music?</label>
                  <textarea
                    ref="q2"
                    name="q2"
                    onChange={this._questionChange}
                  >
                  </textarea>
                </div>
                <div className="form-input">
                  <label>How did the experience make you feel?</label>
                  <textarea
                    ref="q3"
                    name="q3"
                    onChange={this._questionChange}
                  >
                  </textarea>
                </div>
                <div className="form-input">
                  <label>What do you feel you learned about aging, dementia, and yourself?</label>
                  <textarea
                    ref="q4"
                    name="q4"
                    onChange={this._questionChange}
                  >
                  </textarea>
                </div>
              </div>
              <div className="footer-feedback">
                <div className="end" onClick={this._finish}>Save & Exit</div>
              </div>
            </div>);
  }

  _questionChange(e) {
    let answers = this.state.answers;
    answers[e.target.name] = e.target.value;
    this.setState({
      answers: answers
    });
  }

  _finish() {
    this.setState({
      fix: true
    });
    this.props.feedbackActions.end(this.state.answers);
  }
}


let mapStateToProps = (state) => {
  return {
    app: state.app
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    feedbackActions: bindActionCreators(feedbackActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
