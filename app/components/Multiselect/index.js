/*
 * Multiselect
 * <Multiselect options={data.source} loadOptions={getOptions()} onChange={logChange}/>
 */
import React from 'react';
import Autosuggest from 'react-autosuggest';
import SelectedItems from './SelectedItems';

import '!style!css!sass!./index.scss';

export default class Multiselect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      disabledMax: false,
      placeholder: ''
    };
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }

  render() {
    let inputAttributes = {
      disabled: this.state.disabledMax,
      placeholder: this.state.placeholder
    };
    return (<div className="multiselect-component" disabled>
              <Autosuggest
                inputAttributes={inputAttributes}
                suggestions={this.getSuggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                suggestionRenderer={this.suggestionRenderer}
                suggestionValue={this.getSuggestionValue}
                id={this.props.name}
              />
              <div className="auto-mark"> <i className="icon-menu"/> </div>
              { this.props.selected === 'disabled'
                ?   '' : <SelectedItems items={this.state.selected} removeItem={this.removeItem}/> }
            </div>);
  }

  removeItem(id) {
    let newData = this.state.selected;
    delete newData[id];
    this.setState({
      selected: newData || {}
    });
    this.props.onChange(this.state.selected, this.props.name);
    if (this.props.limit && Object.keys(this.state.selected).length < this.props.limit) {
      this.setState({
        disabledMax: false,
        placeholder: ''
      });
    }
  }

  getSuggestions(input, callback) {
    this.props.loadOptions(input, callback);
  }

  onSuggestionSelected(suggestion, event) {
    event.preventDefault();
    let newItem = this.state.selected;
    newItem[suggestion.id] = suggestion;
    this.setState({
      selected: newItem
    });
    this.props.onChange(this.state.selected, this.props.name);
    if (this.props.limit && Object.keys(this.state.selected).length >= this.props.limit) {
      this.setState({
        disabledMax: true,
        placeholder: 'Max item selected'
      });
    }
  }

  suggestionRenderer(track) {
    return <span>{track.name}</span>;
  }

  getSuggestionValue() {
    return '';
  }
}
