import React, { Component } from "react"
import { Highlight, connectAutoComplete } from "react-instantsearch-dom"
import AutoSuggest from "react-autosuggest"

class Autocomplete extends Component {
  state = {
    value: this.props.currentRefinement,
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value)
  }

  onSuggestionsClearRequested = () => {
    this.props.refine()
  }

  getSuggestionValue(hit) {
    return hit.name
  }

  renderSuggestion(hit) {
    return <Highlight attribute="name" hit={hit} tagName="mark" />
  }

  render() {
    const { hits, onSuggestionSelected } = this.props
    const { value } = this.state
    const _onSuggestionSelected = e => {
      const data = hits.find(h => h.name === e.currentTarget.value)
      onSuggestionSelected(data.youtube_id, data)
    }

    const inputProps = {
      placeholder: "Search Chrome DevTools",
      onChange: this.onChange,
      value,
    }

    return (
      <AutoSuggest
        suggestions={hits}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={_onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default connectAutoComplete(Autocomplete)
