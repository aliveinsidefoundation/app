import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spotify from '../../core/Spotify';

import Header from '../../components/Header';
import historyHandler from './../../utils/history';

import * as appActions from '../../actions/app';

import '!style!css!sass!./index.scss';

class Feedback extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // once history is available, store it on /utils/history module.
    historyHandler.set(this.props.history);
  }

  render() {
    return (<div className="feedback-section">
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
                    ref="q3"
                    name="q3"
                    onChange={this._questionChange}
                    required
                  />
                </div>
                <div className="form-input">
                  <label>What was your favorite story that came from the music?</label>
                  <textarea
                    ref="q7"
                    name="q7"
                    onChange={this._questionChange}
                  >
                  </textarea>
                </div>
                <div className="form-input">
                  <label>How did the experience make you feel?</label>
                  <textarea
                    ref="q7"
                    name="q7"
                    onChange={this._questionChange}
                  >
                  </textarea>
                </div>
                <div className="form-input">
                  <label>What do you feel you learned about aging, dementia, and yourself?</label>
                  <textarea
                    ref="q7"
                    name="q7"
                    onChange={this._questionChange}
                  >
                  </textarea>
                </div>
              </div>
              <div className="footer-feedback">
                <div className="end">Save & Exit</div>
              </div>
            </div>);
  }

}

function mapPropsToState(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapPropsToState, mapDispatchToProps)(Feedback);
