import React from 'react'
import Invitation from './Invitation'

const InvitationForm = props => {
    return (
        <form>
            <input placeholder='First Name' />
            <input placeholder='Last Name' />
            <input placeholder='Email' />
            <input placeholder='Cell Phone' />
        </form>
    )
}

export default InvitationForm