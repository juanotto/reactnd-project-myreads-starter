import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Search extends Component {
  state = {
    searchString: '',
  }

  updateSearch = (e) => {
    const newSearch = e.target.value;
    this.setState({searchString: newSearch});
  }

  goToHome = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.goToHome}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              onChange={this.updateSearch}
              value={this.state.searchString}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/**
             * Show search results here.
             */}
          </ol>
        </div>
      </div>
    )
  }
}

export default withRouter(Search);