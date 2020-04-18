import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Shelf from './Shelf';
import * as BooksAPI from '../BooksAPI'

class Dashboard extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => {
        return data.map(book => {
          return {
            id: book.id,
            title: book.title,
            authors: book.authors,
            backgroundUrl: book.imageLinks? book.imageLinks.thumbnail : null,
            shelf: book.shelf,
          };
        })
      })
      .then(data => {
        this.setState({books: data});
      })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    const updatedBooks = this.state.books
      .map(b => {
        if (b.id === book.id) b.shelf = shelf;
        return b;
      });
      this.setState({books: updatedBooks});
  }

  goToSearch = () => {
    this.props.history.push('/search');
  }

  render() {
    const currentlyReading = this.state.books.filter(b => b.shelf === 'currentlyReading');
    const wantToRead = this.state.books.filter(b => b.shelf === 'wantToRead');
    const read = this.state.books.filter(b => b.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf
              shelfTitle={'Currently Reading'}
              shelfBooks={currentlyReading}
              moveBook={this.moveBook}
            />

            <Shelf
              shelfTitle={'Want to Read'}
              shelfBooks={wantToRead}
              moveBook={this.moveBook}
            />

            <Shelf
              shelfTitle={'Read'}
              shelfBooks={read}
              moveBook={this.moveBook}
            />
        </div>
        <div className="open-search">
          <button onClick={this.goToSearch}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);
