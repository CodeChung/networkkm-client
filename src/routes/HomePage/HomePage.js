import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import './HomePage.css'

export default class HomePage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    render() {
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
