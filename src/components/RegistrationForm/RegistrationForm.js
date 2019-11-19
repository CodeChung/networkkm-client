import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils'
import NetworkApiService from '../../services/network-api-service'

export default class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, email, last_name, password } = ev.target

    const user = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value
    }

    NetworkApiService.registerUser(user)
    .then()
    .catch(err => console.log(`ERROR `, err.error))

    first_name.value = ''
    email.value = ''
    last_name.value = ''
    password.value = ''
    this.props.onRegistrationSuccess()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <legend>Join Now</legend>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='first_name'>
          <label htmlFor='RegistrationForm__first_name'>
            First name <Required />
          </label>
          <Input
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
      </form>
    )
  }
}
