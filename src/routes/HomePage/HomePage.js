import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
            .then(network => {
                let friends = network.friends.map(user => this.userToList(user))
                let community = network.community.map(user => this.userToList(user))
                let world = network.world.map(user => this.userToList(user))

                this.setState({ friends, community, world, loading: false })
            })
            .catch(err => console.alert(err))
    }

    userToList(user) {
        return <li key={user.id}><Link to={`/user/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link></li>
    }

    render() {
        const { friends, community, world, loading } = this.state
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
                                {friends}
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My Community</h2>
                        <div className='column-box'>
                            <ul>
                                {community}
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My World</h2>
                        <div className='column-box'>
                            <ul>
                               {world}
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
