import React from 'react'
import { Section } from '../../components/Utils/Utils'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class InvitePage extends React.Component {
    render() {
        return (
            <Section className='InvitePage'>
                <p>
                    Hi there NAME,
                    <br/>
                    Name has invited you to NetworkKM.
                </p>
                <RegistrationForm />
            </Section>
        )
    }
}

export default InvitePage