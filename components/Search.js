Search = React.createClass({
    getInitialState() {
        return {
          searchingText: ''
        };
      },
      handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});
    
        if (searchingText.length > 2) {
          this.props.onSearch(searchingText);
        }
      },
    
      handleKeyUp: function(event) {
        if (event.keyCode === 13) {
          this.props.onSearch(this.state.searchingText);
        }
      },

    render: function() {
    return <input 
             className={'Search'}
             type="text"
             onChange={this.handleChange}
             onKeyUp={this.handleKeyUp}
             placeholder="Tutaj wpisz wyszukiwaną frazę"
             value={this.state.searchTerm}
            />
  }
});