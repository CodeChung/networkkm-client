import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import './HomePage.css'
import NetworkApiService from '../../services/network-api-service'

export default class HomePage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    state = {
        loading: true,
        friends: [],
        community: [],
        world: []
    }

    componentDidMount() {
        NetworkApiService.getFriends()
        this.setState({ loading: false })
    }

    render() {
        const { loading } = this.state
        if (loading) {
            return <img src='https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif' alt='loading' />
        }
        return (
            <Section className='HomePage'>
                <section className='home-columns'>
                    <div className='home-column'>
                        <h2>Alerts</h2>
                        <div className='column-box'>
                            <ul>
                                <li>See Pictures</li>
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My People</h2>
                        <div className='column-box'>
                            {/* <input /> */}
                            <ul>
                                <li>Jimmy John</li>
                                <li>Jimothy Jones</li>
                                <li>JJ</li>
                                <li>Jawaiian Punch</li>
                                <li>LL Cool J</li>
                                <li>Jenny Jones</li>
                                <li>Jones Jones</li>
                                <li>Jerry Jones</li>
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My Community</h2>
                        <div className='column-box'>
                            <ul>
                                <li>Jimmy John</li>
                                <li>Jimothy Jones</li>
                                <li>JJ</li>
                                <li>Jawaiian Punch</li>
                                <li>LL Cool J</li>
                                <li>Jenny Jones</li>
                                <li>Jones Jones</li>
                                <li>Jerry Jones</li>
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My World</h2>
                        <div className='column-box'>
                            <ul>
                                <li>Jimmy John</li>
                                <li>Jimothy Jones</li>
                                <li>JJ</li>
                                <li>Jawaiian Punch</li>
                                <li>LL Cool J</li>
                                <li>Jenny Jones</li>
                                <li>Jones Jones</li>
                                <li>Jerry Jones</li>
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>Programs</h2>
                        <div className='column-box'>
                            <ul>
                                <li>Photos</li>
                                <li>Events</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <button>Invite Members</button>
            </Section>
        )
    }
}
