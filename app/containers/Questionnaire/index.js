import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spotify from '../../core/Spotify';

import Header from '../../components/Header';
import Steps from '../../components/Steps';
import Step from '../../components/Step';
import Multiselect from '../../components/Multiselect';
import Loading from '../../components/Loading';
import historyHandler from './../../utils/history';

import * as questionnaireActions from '../../actions/questionnaire';
import * as appActions from '../../actions/app';

import '!style!css!sass!./index.scss';

class Questionnaire extends Component {

  constructor(props) {
    super(props);

    this._questionChange = this._questionChange.bind(this);
    this._multiChange = this._multiChange.bind(this);

    this.spotify = new Spotify();

    this.state = {
      fix: false,
      help1: false,
      year: null,
      answers: {

      },
      questions: {
        0: {
          q1: {
            valid: ''
          },
          q2: {
            valid: ''
          }
        },
        1: {},
        2: {
          q3: {
            valid: ''
          },
          q4: {
            valid: ''
          },
          q5: {
            valid: true
          },
          q6: {
            valid: true
          },
          q7: {
            valid: true
          }
        },
        3: {
          q8: {
            valid: true
          },
          q9: {
            valid: true
          },
          q10: {
            valid: true
          },
          q11: {
            valid: true
          },
          q12: {
            valid: true
          },
          q13: {
            valid: true
          }
        },
        4: {
          q14: {
            valid: true
          },
          q15: {
            valid: true
          },
          q16: {
            valid: true
          },
          q17: {
            valid: true
          }
        },
        5: {
          q18: {
            valid: true
          },
          q19: {
            valid: true
          },
          q20: {
            valid: true
          }
        },
        6: {
          q21: {
            valid: true
          },
          q22: {
            valid: true
          },
          q23: {
            valid: true
          },
          q24: {
            valid: true
          }
        }
      }
    };
  }

  componentDidMount() {
    // once history is available, store it on /utils/history module.
    historyHandler.set(this.props.history);
  }

  ages(year) {
    return {
      child: (year + 10) + '-' + (year + 15),
      teenager: (year + 16) + '-' + (year + 20),
      adult: (year + 21) + '-' + (year + 40)
    };
  }

  validateStep(step) {
    let globalValid = true;
    let qs = this.state.questions[step - 1];

    if (qs) {
      Object.keys(qs).map(key => {
        let elem = this.refs[key];
        let isValid = true;
        if (elem && elem.checkValidity) {
          isValid = elem.checkValidity();
        }
        let newState = this.state.questions;
        newState[step - 1][key].valid = isValid;
        this.setState({
          questions: newState
        });
        if (!isValid) {
          globalValid = false;
        }
      });
    }

    return globalValid;
  }

  help1() {
    let show = () => {
      this.setState({
        help1: !this.state.help1
      });
    };
    return (
      <div className={'input-help open_'+this.state.help1}>
        <div className="plus" onClick={show}>+</div>
        { this.state.help1 ?
        <div className="help-content">
          <span>
            Here are some questions to learn more about your elder’s story.
          </span>
          <span>
            What was your youth like?
          </span>
          <span>
            What was the biggest event that affected your life?
          </span>
        </div>
        :
        ''
        }
      </div>
    );
  }

  render() {
    let stepChange = (step, next) => {
      if (next) {
        if (step === 1) {
          this.setState({
            userName: this.state.answers['q1']
          });
        }
        if (step === 3) {
          this.props.appActions.setName(this.state.answers['q3']);
          this.props.appActions.setYear(new Date(this.state.answers['q4']).getFullYear());
        }
        if (this.validateStep(step)) {
          next();
        }
      }
    };

    let settings = {
      currentStep: 0,
      stepChange: stepChange,
      nextStatus: () => {
        return true;
      },
      prevStatus: () => {
        return true;
      },
      allowAllSteps: false
    };

    return (<div className="questionnaire-section">
              {this.props.app.loading ? <Loading/> : ''}
              <Header/>
              <div className="wrap-container">
                <Steps settings={settings}>
                  <Step>
                    <div>
                      <span className="step-title">Introduce yourself</span>
                      <div className={'form-input ' + this.state.questions[0].q1.valid}>
                        <label>Whats your name?*</label>
                        <label className="error-label">Your name is required</label>
                        <input
                          type="text"
                          ref="q1"
                          name="q1"
                          onChange={this._questionChange}
                          required
                        />
                      </div>
                      <div className={'form-input ' + this.state.questions[0].q2.valid}>
                        <label>Whats your email?*</label>
                        <label className="error-label">Your email is required</label>
                        <span className="more-info">`Well send you via email the resulting playlist
                         and use this email to keep in touch. We never
                         share this information.`</span>
                        <input
                          type="email"
                          ref="q2"
                          name="q2"
                          onChange={this._questionChange}
                          required
                        />
                      </div>
                      <p className="terms">I agree to the <a href="#" target="_blank">
                      Terms & Conditions</a> and <a href="#" target="_blank">Privacy Policy
                      </a> of this website. I understand that the any information I provide will be
                      shared with the Alive Inside Foundation. This information will only be used
                      for X purposes and not shared publicy without your permission.</p>
                    </div>
                  </Step>
                  <Step>
                    <div className="nice-meet">
                      <span className="step-title">
                        Nice to meet you, {this.state.userName}!
                      </span>
                      <span>You are an official Memory Detective! Now that we know who you are, we
                      want to get to know your elder.</span>
                      <p>The answers to the questions will generate a playlist, but don’t worry if
                      you aren’t able to answer every question. That’s OK!  </p>
                      <p>Look for the + along the way for prompts to help you get more detailed answers.</p>
                    </div>
                  </Step>
                  <Step>
                    <div>
                      <span className="step-title">Interview time! Ask your elder:</span>

                      <div className={'form-input ' + this.state.questions[2].q3.valid}>
                        <label>Whats your name?*</label>
                        <label className="error-label">Your name is required</label>
                        <input
                          type="text"
                          ref="q3"
                          name="q3"
                          onChange={this._questionChange}
                          required
                        />
                      </div>
                      <div className={'form-input ' + this.state.questions[2].q4.valid}>
                        <label>What is your year of birth? Format: YYYY*</label>
                        <label className="error-label">Your birth is required</label>
                        <input
                          type="date"
                          ref="q4"
                          name="q4"
                          onChange={this._questionChange}
                          required
                        />
                      </div>
                      <div className="form-input">
                        <label>Where were you born? </label>
                        <input
                          type="text"
                          ref="q5"
                          name="q5"
                          onChange={this._questionChange}
                        />
                      </div>
                      <div className="form-input">
                        <label>Where did you grow up?</label>
                        <input
                          type="text"
                          ref="q6"
                          name="q6"
                          onChange={this._questionChange}
                        />
                      </div>
                      <div className="form-input">
                        <label>Tell me about your story. </label>
                        {this.help1()}
                        <textarea
                          ref="q7"
                          name="q7"
                          onChange={this._questionChange}
                        >
                        </textarea>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div>
                      <span className="step-title">Time for the music! Ask your elder:</span>

                      <div className="form-input">
                        <label>Do you play an instrument? Which instrument(s)?</label>
                        <input
                          type="text"
                          ref="q8"
                          name="q8"
                          onChange={this._questionChange}
                        />
                      </div>
                      <div className="form-input">
                        <label>What is the first song you remember hearing?</label>
                        <Multiselect
                          loadOptions={this._loadOptions.bind(this)}
                          ref="q9"
                          name="q9"
                          onChange={this._multiChange}
                          />
                      </div>
                      <div className="form-input">
                        <label>What was the first record you bought?</label>
                        <input
                          type="text"
                          ref="q10"
                          name="q10"
                          onChange={this._questionChange}
                        />
                      </div>
                      <div className="form-input">
                        <label>Who were your favorite musicians as a child?</label>
                        <Multiselect
                          loadOptions={(input, callback) => {
                            this._loadOptions(`${input}}`, callback);
                          }}
                          ref="q11"
                          name="q11"
                          onChange={this._multiChange}
                          />
                      </div>
                      <div className="form-input">
                        <label>Who were your favorite musicians as a teenager?</label>
                        <Multiselect
                          loadOptions={(input, callback) => {
                            this._loadOptions(`${input}}`, callback);
                          }}
                          ref="q12"
                          name="q12"
                          onChange={this._multiChange}
                          />
                      </div>
                      <div className="form-input">
                        <label>Who were your favorite musicians as a young adult? </label>
                        <Multiselect
                          loadOptions={(input, callback) => {
                            this._loadOptions(`${input}}`, callback);
                          }}
                          ref="q13"
                          name="q13"
                          onChange={this._multiChange}
                          />
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div>
                      <span className="step-title">Heritage music. Ask your elder:</span>
                      <div className="form-input">
                        <label>What is your heritage? </label>
                        <input
                          type="text"
                          ref="q14"
                          name="q14"
                          onChange={this._questionChange}
                        />
                      </div>
                      <div className="form-input hidden">
                        <label>Is your heritage music important to you?</label>
                        <div className="radio-button">
                            <label htmlFor="radio-yes">
                              <input
                                type="radio"
                                value="yes"
                                name="q15"
                                id="radio-yes"
                                onChange={this._questionChange}
                              />Yes
                            </label>
                            <label htmlFor="radio-no">
                              <input
                                type="radio"
                                value="no"
                                name="q15"
                                id="radio-no"
                                onChange={this._questionChange}
                              />No
                            </label>
                        </div>
                      </div>
                      <div className="form-input">
                        <label>What genres of music are part of your heritage? </label>
                        <input
                          type="text"
                          ref="q16"
                          name="q16"
                          onChange={this._questionChange}
                        />
                      </div>
                      <div className="form-input">
                        <label>
                          Who are some of the musicians from your heritage that you remember?
                        </label>
                        <input
                          type="text"
                          ref="q17"
                          name="q17"
                          onChange={this._questionChange}
                        />
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div>
                      <span className="step-title">Family influence. Ask your elder :</span>
                      <div className="form-input">
                        <label>Where are your parents from? </label>
                        <input
                          type="text"
                          ref="q18"
                          name="q18"
                          onChange={this._questionChange}
                        />
                      </div>
                      <div className="form-input">
                        <label>Were you raised religious? If so, what religion? </label>
                        <select ref="q19" name="q19" onChange={this._questionChange}>
                          <option value="Christianity">Christianity</option>
                          <option value="Islamic">Islamic</option>
                          <option value="Not">Not Religious</option>
                          <option value="Hinduism">Hinduism</option>
                          <option value="Chinese">Chinese Traditional Religion</option>
                          <option value="Buddhism">Buddhism</option>
                          <option value="Primal">Primal Indigenous</option>
                          <option value="Judaism">Judaism</option>
                          <option value="Bahai ">Bahai </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-input">
                        <label>
                          What musicians did your parents listen to when you were growing up?
                        </label>
                        <Multiselect
                          loadOptions={this._loadArtists.bind(this)}
                          ref="q20"
                          name="q20"
                          onChange={this._multiChange}
                          />
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div>
                      <span className="step-title">Music memories. Ask your elder:</span>
                      <div className="form-input">
                        <label>
                          Imagine you’re a kid in your parent’s car or in the first care you owned.
                          What’s on the radio?
                        </label>
                        <Multiselect
                          loadOptions={this._loadOptions.bind(this)}
                          ref="q21"
                          name="q21"
                          onChange={this._multiChange}
                          />
                      </div>
                      <div className="form-input">
                        <label>What is your most emotional music memory?</label>
                        <Multiselect
                          loadOptions={this._loadOptions.bind(this)}
                          ref="q22"
                          name="q22"
                          onChange={this._multiChange}
                          />
                      </div>
                      <div className="form-input">
                        <label>
                          Do you have any life events that are connected with songs? What songs?
                        </label>
                        <Multiselect
                          loadOptions={this._loadOptions.bind(this)}
                          ref="q23"
                          name="q23"
                          onChange={this._multiChange}
                          />
                      </div>
                      <div className="form-input">
                        <label>
                          What songs do you love that no one knows you love?
                          Any songs with emotion memories.
                        </label>
                        <Multiselect
                          loadOptions={this._loadOptions.bind(this)}
                          ref="q24"
                          name="q24"
                          onChange={this._multiChange}
                          />
                      </div>
                      <div className="btn-finish" onClick={this._finish.bind(this)}>
                        The interview is done! Press submit to generate your elder’s playlist.
                      </div>
                    </div>
                  </Step>
                </Steps>
              </div>
            </div>);
  }

  _multiChange(value, name) {
    let answers = this.state.answers;
    answers[name] = value;
    this.setState({
      answers: answers
    });
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
    let year = new Date(this.state.answers.q4);
    this.props.qActions.end(this.state.answers, year.getFullYear());
  }

  _loadOptions(input, callback) {
    if (input.length > 3) {
      this.spotify.getTracks({market: 'US', limit: 5, q: input})
        .then(response => {
          return response.map(item => {
            return {
              id: item.id,
              name: `${item.name} - ${item.artists[0].name}`,
              artist: item.artists.first()
            };
          });
        })
        .then((response) => {
          callback(null, response);
        });
    }
  }

  _loadArtists(input, callback) {
    if (input.length > 3) {
      this.spotify.getArtists({market: 'US', limit: 5, q: input})
        .then(response => {
          return response.map(item => {
            return {id: item.id, name: `${item.name}`};
          });
        })
        .then((response) => {
          callback(null, response);
        });
    }
  }
}

function mapPropsToState(state) {
  return {
    app: state.app
  }
};

function mapDispatchToProps(dispatch) {
  return {
    qActions: bindActionCreators(questionnaireActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapPropsToState, mapDispatchToProps)(Questionnaire);
