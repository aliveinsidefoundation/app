import React, { Component } from 'react';

import '!style!css!sass!./index.scss';

export default class Footer extends Component {
  render() {
    return (
      <div id="footer" className="footer">
        <div className="wrap-container">
          <span className="copy">© Alive Inside Foundation</span>
          <span className="contact">Need to get in touch? Email us at hello@aliveinside.org</span>
        </div>
      </div>
      );
  }
}
