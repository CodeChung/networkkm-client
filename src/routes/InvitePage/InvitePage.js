import React from 'react'
import { Section } from '../../components/Utils/Utils'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './InvitePage.css'
import NetworkApiService from '../../services/network-api-service'
import queryString from 'query-string'

class InvitePage extends React.Component {
    state = {
        from: '',
        to: '',
        error: '',
        email: '',
    }
    componentDidMount() {
        const values = queryString.parse(this.props.location.search)

        this.setState({
            from: values.from,
            to: values.to,
            email: values.email,
        })
    }
    render() {
        const { from, to, email } = this.state
        if (from) {
            return (
                <Section className='InvitePage'>
                    <div>
                        <p>
                            Hi there {to},
                        <br />
                            {from} has invited you to NetworkKM.
                    </p>
                        <p>
                            NetworkKM is a cool network for networking about networks.
                        <br />
                            So while you network why don't you network with Network KM.
                    </p>
                        <p>Remember you can't spell network with K or M (upside down) ;)</p>
                    </div>
                    <RegistrationForm 
                        first={to.split(' ')[0]} 
                        last={to.split(' ')[1]} 
                        email={email} 
                    />
                </Section>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default InvitePage