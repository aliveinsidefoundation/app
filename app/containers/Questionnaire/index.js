import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../components/Header';
import Steps from '../../components/Steps';
import Step from '../../components/Step';
import Multiselect from '../../components/Multiselect';

import '!style!css!sass!./index.scss';

class Questionnaire extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

  validateStep(step) {
    let globalValid = true;
    let qs = Object.keys(this.state.questions[step - 1]);

    qs.map(key => {
      let elem = this.refs[key];
      let isValid = true;
      if (elem.checkValidity) {
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

    return globalValid;
  }

  render() {

    let stepChange = (step, next) => {
      if (next) {
        // if (this.validateStep(step)) {
          next();
        // }
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
                          required
                        />
                      </div>
                      <p className="terms">`I agree to the Terms & Conditions and Privacy Policy
                      of this website. I understand that the any information I provide will be
                      shared with the Alive Inside Foundation. This information will only be used
                      for X purposes and not shared publicy without your permission.`</p>
                    </div>
                  </Step>
                  <Step>
                    <div>
                      <span className="step-title">Nice to meet you, {this.state.questions[0].q1.value}!</span>
                      <span>You are an official Music Detective! Now that we know who you are, we want to get to know your elder. </span>
                      <p>The answers to the questions will generate a playlist, but don’t worry if you aren’t able to answer every questions. That’s OK!  Look for the + along the way for prompts to help you get more detailed answers. </p>
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
                          required
                        />
                      </div>
                      <div className={'form-input ' + this.state.questions[2].q4.valid}>
                        <label>What is your year of birth? Format: YYYY*</label>
                        <label className="error-label">Your birth is required</label>
                        <input
                          type="text"
                          ref="q4"
                          required
                        />
                      </div>
                      <div className="form-input">
                        <label>Where were you born? </label>
                        <input
                          type="text"
                          ref="q5"
                        />
                      </div>
                      <div className="form-input">
                        <label>Where did you grow up?</label>
                        <input
                          type="text"
                          ref="q6"
                        />
                      </div>
                      <div className="form-input">
                        <label>Tell me about your story. </label>
                        <textarea ref="q7"></textarea>
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
                        />
                      </div>
                      <div className="form-input">
                        <label>What is the first song you remember hearing?</label>
                        <input
                          type="text"
                          ref="q9"
                        />
                      </div>
                      <div className="form-input">
                        <label>What was the first record you bought?</label>
                        <input
                          type="text"
                          ref="q10"
                        />
                      </div>
                      <div className="form-input">
                        <label>Who were your favorite musicians as a child?</label>
                        <Multiselect name="question1" loadOptions='' ref="q11"/>
                      </div>
                      <div className="form-input">
                        <label>Who were your favorite musicians as a teenager?</label>
                        <Multiselect name="question1" loadOptions='' ref="q12"/>
                      </div>
                      <div className="form-input">
                        <label>Who were your favorite musicians as a young adult? </label>
                        <Multiselect name="question1" loadOptions='' ref="q13"/>
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
                        />
                      </div>
                      <div className="form-input hidden">
                        <label>Is your heritage music important to you?</label>
                        <div className="radio-button">
                            <label htmlFor="accessible">
                              <input type="radio" value="accessible" name="quality" id="accessible"/>Yes
                            </label>
                            <label htmlFor="pretty">
                              <input type="radio" value="pretty" name="quality" id="pretty"/>No
                            </label>
                        </div>
                      </div>
                      <div className="form-input">
                        <label>What genres of music are part of your heritage? </label>
                        <Multiselect name="question1" loadOptions='' ref="q16"/>
                      </div>
                      <div className="form-input">
                        <label>Who are some of the musicians from your heritage that you remember?</label>
                        <Multiselect name="question1" loadOptions='' ref="q17"/>
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
                        />
                      </div>
                      <div className="form-input">
                        <label>Were you raised religious? If so, what religion? </label>
                        <input
                          type="text"
                          ref="q19"
                        />
                      </div>
                      <div className="form-input">
                        <label>What musicians did your parents listen to when you were growing up?</label>
                        <Multiselect name="question1" loadOptions='' ref="q20"/>
                      </div>
                    </div>
                  </Step>
                  <Step>
                    <div>
                      <span className="step-title">Music memories. Ask your elder:</span>
                      <div className="form-input">
                        <label>Imagine you’re a kid in your parent’s car or in the first care you owned. What’s on the radio? </label>
                        <input
                          type="text"
                          ref="q21"
                        />
                      </div>
                      <div className="form-input">
                        <label>What is your most emotional music memory?</label>
                        <textarea ref="q22"></textarea>
                      </div>
                      <div className="form-input">
                        <label>Do you have any life events that are connected with songs? What songs?</label>
                        <Multiselect name="question1" loadOptions='' ref="q23"/>
                      </div>
                      <div className="form-input">
                        <label>What songs do you love that no one knows you love? Any songs with emotion memories.</label>
                        <Multiselect name="question1" loadOptions='' ref="q24"/>
                      </div>
                      <div className="btn-finish">The interview is done! Press submit to generate your elder’s playlist.</div>
                    </div>
                  </Step>
                </Steps>
              </div>
            </div>);
  }

  // inputChange(e, name) {
  //   let questions = this.state.questions;
  //   if (name) {
  //     questions[name] = e;
  //   } else {
  //     questions[e.target.name] = e.target.value;
  //   }

  //   this.setState({
  //     questions: questions,
  //   });
  // }

  _finish() {

  }

}

export default Questionnaire;
