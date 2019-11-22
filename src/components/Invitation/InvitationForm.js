import React from 'react'
import Invitation from './Invitation'
import NetworkApiService from '../../services/network-api-service'

class InvitationForm extends React.Component {
    state = {
        first: '',
        last: '',
        email: '',
        cell: '',
    }

    componentDidMount() {
        if (this.props.active) {
            
            const { email } = this.state
            // NetworkApiService.checkEmail(email)
            console.log('yolog')
        }
    }

    onSubmit = () => {
        const { email } = this.state
        NetworkApiService.checkEmail(email)
    }

    handleFirst = (event) => {
        this.setState({ first: event.target.value })
    }

    handleLast = (event) => {
        this.setState({ last: event.target.value })
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handleCell = (event) => {
        this.setState({ cell: event.target.value })
    }

    render() {
        const { first, last, email, cell } = this.state
        return (
            <div className='invitation-row'>
                <input onChange={(e) => this.handleFirst(e)} placeholder='First Name' value={first} />
                <input onChange={(e) => this.handleLast(e)} placeholder='Last Name' value={last} />
                <input onChange={(e) => this.handleEmail(e)} placeholder='Email' value={email} />
                <input onChange={(e) => this.handleCell(e)} placeholder='Cell Phone' value={cell} />
            </div>
        )
    }
}

export default InvitationForm