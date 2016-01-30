import React from 'react';

export default class SelectedItems extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let items = Object.keys(this.props.items).map((item) => {
      return <li key={this.props.items[item].id}>
                {this.props.items[item].name} <span className='remove-item' onClick={this.props.removeItem.bind(this, item)}>x</span>
              </li>;
    });
    return <ul className="selected-items">{items}</ul>;
  }
}
