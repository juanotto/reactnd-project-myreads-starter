import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

export default class Shelf extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelfBooks.map(book => (
              <li key={book.title}>
                <Book bookData={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
