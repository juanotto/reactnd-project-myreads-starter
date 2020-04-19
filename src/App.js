import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Search from './components/Search'
import Dashboard from './components/Dashboard'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
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
    const foundBook = this.state.books.find(b => b.id === book.id);
    const goingToNone = shelf === 'none';
    if (!foundBook) {
        this.setState({books: [...this.state.books, book]});
    } else {
      if (goingToNone) {
        const updatedBooks = this.state.books
          .filter(b => b.id !== book.id);
          this.setState({books: updatedBooks});
      } else {
        const updatedBooks = this.state.books
          .map(b => {
            if (b.id === book.id) b.shelf = shelf;
            return b;
          });
          this.setState({books: updatedBooks});
      }
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Dashboard
              books={this.state.books}
              moveBook={this.moveBook} />
          </Route>
          <Route path="/search">
            <Search
              books={this.state.books}
              moveBook={this.moveBook} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
