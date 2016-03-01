import React, { Component } from 'react';

import '!style!css!sass!./index.scss';

export default class PopupAlert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'popup-container ' + this.props.type}>
        <div className="popup">
        {this.props.children}
        </div>
        <div className="overlay"></div>
      </div>
      );
  }
}
