import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../../services/token-service'
import './Header.css'
import NetworkApiService from '../../services/network-api-service'

export default class Header extends Component {
  state = {
    name: ''
  }
  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      NetworkApiService.getUser()
        .then(user => this.setState({ name: `${user.first_name} ${user.last_name}`}))
    }
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderLogoutLink() {
    const { name } = this.state
    return (
      <div className='Header__logged-in'>
        {name }
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
      </div>
    )
  }

  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            Network KM
          </Link>
        </h1>
        <span className='Header__tagline--wide'>About</span>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}
