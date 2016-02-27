import React from 'react';

import '!style!css!sass!./index.scss';

export default class Step extends React.Component {
  render() {
    return (
      <div className={'step-item step-' + this.props.index + ' ' + this.props.isActive}>
        {this.props.children}
      </div>
    );
  }
}
