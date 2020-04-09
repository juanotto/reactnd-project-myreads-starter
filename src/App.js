import React from 'react'
import './App.css'
import { Switch, Route, withRouter } from 'react-router-dom'
import Search from './components/Search'
import Dashboard from './components/Dashboard'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(BooksApp);
