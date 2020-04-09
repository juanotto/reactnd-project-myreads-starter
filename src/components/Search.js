import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    searchString: '',
    results: [],
  }

  updateSearch = (e) => {
    const newSearch = e.target.value;
    this.setState({searchString: newSearch});

    BooksAPI.search(newSearch)
      .then(data => {
        if (data !== undefined && data.error === undefined) {
          return data.map(book => {
            return {
              id: book.id,
              title: book.title,
              authors: book.authors,
              backgroundUrl: book.imageLinks? book.imageLinks.thumbnail : null,
            };
          })
        } else {
          return [];
        }
      })
      .then(formattedData => {
        this.setState({results: formattedData});
      });
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
            {this.state.results.map(book => (
              <Book key={book.id} bookData={book} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default withRouter(Search);
