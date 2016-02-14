import React from 'react';
import { Router, Route } from 'react-router';

import Home from './containers/Home';
import About from './containers/About';
import Questionnaire from './containers/Questionnaire';
import Playlist from './containers/Playlist';
import Feedback from './containers/Feedback';

export default (<Router>
                  <Route path='/' component={Home} />
                  <Route path='about' component={About} />
                  <Route path='questionnaire' component={Questionnaire} />
                  <Route path='playlist' component={Playlist} />
                  <Route path='feedback' component={Feedback} />
               </Router>);
