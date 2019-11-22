import React from 'react'
import InvitationForm from './InvitationForm'
import NetworkApiService from '../../services/network-api-service'
import MessageTemplates from './MessageTemplates'

class Invitation extends React.Component {
    state = {
        invites: [<InvitationForm/>, <InvitationForm/>, <InvitationForm/>],
    }
    addInvitation = () => {
        this.setState({ invites: [...this.state.invites, <InvitationForm/>] })
    }
    sendInvitations = () => {
        NetworkApiService.sendEmailInvite()
    }
    render() {
        return (
            <div className='invitation'>
                <h2>Invite New Members</h2>
                {this.state.invites}
                <button onClick={this.addInvitation}>Insert New Row</button>
                <button onClick={this.sendInvitations}>Choose from One of 5 Messages</button>
                <MessageTemplates />
            </div>
        )
    }
}

export default Invitation