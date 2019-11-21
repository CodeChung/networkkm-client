import React from 'react'
import InvitationForm from './InvitationForm'

class Invitation extends React.Component {
    state = {
        invites: [<InvitationForm/>, <InvitationForm/>, <InvitationForm/>],
    }
    addInvitation = () => {
        this.setState({ invites: [...this.state.invites, <InvitationForm/>] })
    }
    sendInvitations = () => {

    }
    render() {
        return (
            <div className='invitation'>
                <h2>Invite New Members</h2>
                {this.state.invites}
                <button onClick={this.addInvitation}>Insert New Row</button>
                <button>Choose from One of 5 Messages</button>
            </div>
        )
    }
}

export default Invitation