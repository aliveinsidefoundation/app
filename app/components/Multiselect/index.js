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
    };
  }

  render() {
    return (<div className='multiselect-component'>
              <Autosuggest
                suggestions={this.getSuggestions}
                onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                suggestionRenderer={this.suggestionRenderer}
                suggestionValue={this.getSuggestionValue}
                id={this.props.name}
              />
              <SelectedItems items={this.state.selected} removeItem={this.removeItem.bind(this)}/>
            </div>);
  }

  removeItem(id) {
    let newData = this.state.selected;
    delete newData[id];
    this.setState({
      selected: newData || {},
    });
    this.props.onChange(this.state.selected, this.props.name);
  }

  getSuggestions(input, callback) {
    const suggestions = [{id:1, name: 'joel'}, {id:2, name: 'marcos'}, {id:3, name: 'julio'}];

    setTimeout(() => callback(null, suggestions), 300); // Emulate API call
  }

  onSuggestionSelected(suggestion, event) {
    event.preventDefault();
    let newItem = this.state.selected;
    newItem[suggestion.id] = suggestion;
    this.setState({
      selected: newItem,
    });
    this.props.onChange(this.state.selected, this.props.name);
  }

  suggestionRenderer(track) {
    return <span>{track.name}</span>;
  };

  getSuggestionValue(track) {
    return `${track.name}`;
  };
}
