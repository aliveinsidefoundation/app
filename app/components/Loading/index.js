import React, { Component } from 'react';

import '!style!css!sass!./index.scss';

export default class Loading extends Component {
  render() {
    return (<div className="loading">
              <img src="/images/loading.svg"/>
            </div>);
  }
}
