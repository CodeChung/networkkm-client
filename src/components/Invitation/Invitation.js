import React from 'react'
import InvitationForm from './InvitationForm'
import NetworkApiService from '../../services/network-api-service'
import MessageTemplates from './MessageTemplates'

class Invitation extends React.Component {
    state = {
        rows: [
            { first: '', last: '', email: '', phone: '' },
            { first: '', last: '', email: '', phone: '' },
            { first: '', last: '', email: '', phone: '' },
        ],
        send: false,

        first: '',
        last: '',
        phone: '',
        email: '',
    }
    addInvitation = () => {
        this.setState({ rows: [...this.state.rows, { first: '', last: '', email: '', phone: '' }] })
    }
    sendInvitations = () => {
        NetworkApiService.sendEmailInvite()
        this.setState({ send: true })
    }
    onSubmit = (email) => {
        NetworkApiService.checkEmail(email)
    }
    staticAdd = (event, friend) => {
        event.preventDefault()
        this.props.addFriend(friend)
        NetworkApiService.checkEmail(friend)
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
        const { rows, first, last, phone, email } = this.state
        return (
            <div className='invitation'>
                <h2>Invite New Members</h2>
                {/* <form>
                    {rows.map((row, ind) => 
                        <InvitationForm 
                            key={ind} 
                            first={row.first}
                            last={row.last}
                            email={row.email}
                            phone={row.phone}
                            active={this.state.send}
                        />
                    )}
                </form> */}
                <form>
                    <input onChange={(e) => this.handleFirst(e)} placeholder='First Name' value={first} />
                    <input onChange={(e) => this.handleLast(e)} placeholder='Last Name' value={last} />
                    <input onChange={(e) => this.handleEmail(e)} placeholder='Email' value={email} />
                    <input onChange={(e) => this.handleCell(e)} placeholder='Cell Phone' value={phone} />
                    <button onClick={(event) => this.staticAdd(event ,{
                        first_name: first,
                        last_name: last,
                        email: email,
                    })}>Invite</button>
                </form>

                <button onClick={this.addInvitation}>Insert New Row</button>
                <button onClick={this.sendInvitations}>Choose from One of 5 Messages</button>
                {/* <button onClick={(friend) => this.staticAdd(friend)}>Invite</button> */}
                <MessageTemplates />
            </div>
        )
    }
}

export default Invitation