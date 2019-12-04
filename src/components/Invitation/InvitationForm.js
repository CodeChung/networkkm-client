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

    componentDidUpdate(prevProps) {
        const { first, last, email, cell } = this.state
        if (prevProps.sendInvites !== this.props.sendInvites) {
            console.log('ok we can send it out', first, last, email)
            const friend = {
                first_name: first,
                last_name: last,
                email: email,
            }
            this.props.addFriend(friend)
            NetworkApiService.checkEmail(friend)
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