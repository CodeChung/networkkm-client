import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input, Required } from '../Utils/Utils'
import NetworkApiService from '../../services/network-api-service'
import TokenService from '../../services/token-service'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistraticcess: () => { }
  }

  state = { 
    first: '',
    last: '',
    email: '',
    error: null,
    registered: false, 
  }
  
  componentDidMount() {
    const { first, last, email } = this.props
    this.setState({ first, last, email })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, email, last_name, password } = ev.target

    let newPassword = password.value

    const user = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value
    }

    NetworkApiService.registerUser(user)
      .then(newUser => {
        newUser.password = password.value
        this.props.onSuccessfulRegistration(newUser, newPassword)
      })
      .catch(err => this.setState({ error: err.error }))
    TokenService.saveAuthToken('yolo')
    this.setState({ registered: true })
    first_name.value = ''
    email.value = ''
    last_name.value = ''
    password.value = ''
  }

  render() {
    const { first, last, email, error, registered } = this.state
    if (registered) {
      return <Redirect to='/home' />
    }
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <legend>Join Now</legend>
        <div className='first_name'>
          <label htmlFor='RegistrationForm__first_name'>
            First name <Required />
          </label>
          <Input
            value={first}
            name='first_name'
            type='text'
            required
            id='RegistrationForm__first_name'>
          </Input>
        </div>
        <div className='last_name'>
          <label htmlFor='RegistrationForm__last_name'>
            Last name <Required />
          </label>
          <Input
            value={last}
            name='last_name'
            type='text'
            required
            id='RegistrationForm__last_name'>
          </Input>
        </div>
        <div className='email'>
          <label htmlFor='RegistrationForm__email'>
            Email
          </label>
          <Input
            value={email}
            name='email'
            type='text'
            required
            autoComplete='username'
            id='RegistrationForm__email'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            required
            autoComplete='new-password'
            id='RegistrationForm__password'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__confirm_password'>
            Confirm Password <Required />
          </label>
          <Input
            name='confirm-password'
            type='password'
            required
            autoComplete='new-password'
            id='RegistrationForm__confirm_password'>
          </Input>
        </div>
        <Button type='submit'>
          Register
        </Button>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
      </form>
    )
  }
}
