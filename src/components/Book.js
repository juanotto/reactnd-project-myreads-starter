import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noThumb from '../images/thumb_not.jpg'

export default class Book extends Component {
  static propTypes = {
    bookData: PropTypes.object.isRequired,
    moveBook: PropTypes.func
  }

  moveShelves = (event) => {
    this.props.moveBook(this.props.bookData.id, event.target.value);
  }

  render() {
    const {title, authors, shelf, backgroundUrl} = this.props.bookData;
    const wrappedBackgroundUrl = backgroundUrl?
      `url("${backgroundUrl}")` :
      `url("${noThumb}")`;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: wrappedBackgroundUrl }}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={this.moveShelves}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          {authors &&
            <div className="book-authors">{authors.join(', ')}</div>
          }
        </div>
      </li>
    )
  }
}
