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

    const formattedSearch = newSearch.trim()
      .split(/[\s-,.]+/)
      .join(' ');

    BooksAPI.search(formattedSearch)
      .then(data => {
        if (data !== undefined && data.error === undefined) {
          return data.map(book => {
            const bookInShelf = this.props.books.filter(b => b.id === book.id);
            if (bookInShelf.length > 1) {
              console.warn('Filtering by id should give one element at most', bookInShelf);
            }
            const shelf = bookInShelf.length === 0? 'none'
              : bookInShelf[0].shelf;
            return {
              id: book.id,
              title: book.title,
              authors: book.authors,
              backgroundUrl: book.imageLinks? book.imageLinks.thumbnail : null,
              shelf: shelf
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

  updateBookResultAndMove = (book, shelf) => {
    this.props.moveBook(book, shelf);
    const updatedResults = this.state.results.map(b => {
      if (b.id === book.id) b.shelf = shelf;
      return b;
    });
    this.setState({results: updatedResults});
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
              <Book key={book.id} bookData={book} moveBook={this.updateBookResultAndMove} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default withRouter(Search);
