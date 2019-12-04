import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input } from '../Utils/Utils'
import NetworkApiService from '../../services/network-api-service'
import TokenService from '../../services/token-service'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  state = { logged: false, error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault()
    const { email, password } = ev.target
    const user = {
      email: email.value,
      password: password.value
    }
    NetworkApiService.loginUser(user)
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        NetworkApiService.getUser()
        this.setState({ logged: true })
      })
      .catch(res => this.setState({ error: res.error }))

    email.value = ''
    password.value = ''
  }

  render() {
    const { logged, error } = this.state
    if (logged) {
      return <Redirect to='/home' />
    }
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitBasicAuth}
      >
        <legend>Login</legend>
        <div className='email'>
          <label htmlFor='LoginForm__email'>
            Email
          </label>
          <Input
            autoComplete='username'
            required
            name='email'
            id='LoginForm__email'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            required
            autoComplete="current-password"
            name='password'
            type='password'
            id='LoginForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
        <Button >
          Forgot Password
        </Button>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
      </form>
    )
  }
}
