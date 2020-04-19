import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Shelf from './Shelf';

class Dashboard extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  goToSearch = () => {
    this.props.history.push('/search');
  }

  render() {
    const currentlyReading = this.props.books.filter(b => b.shelf === 'currentlyReading');
    const wantToRead = this.props.books.filter(b => b.shelf === 'wantToRead');
    const read = this.props.books.filter(b => b.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf
              shelfTitle={'Currently Reading'}
              shelfBooks={currentlyReading}
              moveBook={this.props.moveBook}
            />

            <Shelf
              shelfTitle={'Want to Read'}
              shelfBooks={wantToRead}
              moveBook={this.props.moveBook}
            />

            <Shelf
              shelfTitle={'Read'}
              shelfBooks={read}
              moveBook={this.props.moveBook}
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
