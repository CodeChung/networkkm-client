import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
// import PrivateRoute from '../Utils/PrivateRoute'
// import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import ThingListPage from '../../routes/ThingListPage/ThingListPage'
import ThingPage from '../../routes/ThingPage/ThingPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'
import HomePage from '../../routes/HomePage/HomePage'
import InvitePage from '../../routes/InvitePage/InvitePage'

class App extends Component {
  state = { hasError: false, user: null, refresh: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }
  login = (user) => {
    this.setState({ user })
  }
  refresh = () => {
    this.setState({ refresh: !this.state.refresh })
  }
  render() {
    const { user, refresh } = this.state
    return (
      <div className='App'>
        <header className='App__header'>
          {/* <Header /> */}
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <Route
              exact
              path={'/'}
              refresh={refresh}
              render={() => <ThingListPage login={this.login} />}
            />
            <Route
              path='/home'
              component={HomePage}
            />
            <Route
              path={'/login'}
              component={LoginPage}
            />
            <Route
              path={'/register'}
              component={RegistrationPage}
            />
            <Route
              path={'/thing/:thingId'}
              component={ThingPage}
            />
            <Route
              path={'/invite'}
              component={InvitePage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
