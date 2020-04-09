import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Shelf from './Shelf';
import * as BooksAPI from '../BooksAPI'

class Dashboard extends Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  }

  componentDidMount() {
    const bookData = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
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
        data.forEach(book => {
          bookData[book.shelf].push(book);
        });
        this.setState({books: bookData});
      })
  }
  

  goToSearch = () => {
    this.props.history.push('/search');
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf
              shelfTitle={'Currently Reading'}
              shelfBooks={this.state.books.currentlyReading}
            />

            <Shelf
              shelfTitle={'Want to Read'}
              shelfBooks={this.state.books.wantToRead}
            />

            <Shelf
              shelfTitle={'Read'}
              shelfBooks={this.state.books.read}
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
