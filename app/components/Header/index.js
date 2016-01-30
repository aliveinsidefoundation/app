import React, { Component } from 'react';

import '!style!css!sass!./index.scss';

export default class Header extends Component {
  render() {
    return (<div id="header" className="header">
              <div className="wrap-container">
                <a className="logo" href="/">
                  <img src="/images/logo.png"/>
                </a>
                <div className="button create-playlist"><i className="icon-music"></i> CREATE A PLAYLiST</div>
                <a href="/#/about" className="menu-item">ABOUT THE FOUNDATION</a>
              </div>
            </div>);
  }
}
