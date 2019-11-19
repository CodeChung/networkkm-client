import React, { Component } from 'react'
import { Button, Input } from '../Utils/Utils'
import NetworkApiService from '../../services/network-api-service'
import TokenService from '../../services/token-service'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  state = { error: null }

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
        this.props.onLogin()
      })
      .catch(res => console.log(res))

    email.value = ''
    password.value = ''
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitBasicAuth}
      >
        <legend>Login</legend>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
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
      </form>
    )
  }
}
