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
        friendList: [],
        community: [],
        communityList: [],
        world: [],
        worldList: [],
        searchFriend: '',
        searchCommunity: '',
        searchWorld: '',
    }

    componentDidMount() {
        NetworkApiService.getFriends()
            .then(network => {
                let friendList = network.friends.map(user => this.userToList(user))
                let communityList = network.community.map(user => this.userToList(user))
                let worldList = network.world.map(user => this.userToList(user))

                this.setState({
                    friends: network.friends,
                    friendList,
                    community: network.community,
                    communityList,
                    world: network.world,
                    worldList,
                    loading: false
                })
            })
            .catch(err => console.alert(err))
    }

    userToList(user) {
        return <li key={user.id}><Link to={`/user/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link></li>
    }

    handleSearchPeople = (event) => {
        event.preventDefault()
        this.setState({ searchFriend: event.target.value })
    }

    handleSearchCommunity = (event) => {
        event.preventDefault()
        this.setState({ searchCommunity: event.target.value })
    }

    handleSearchWorld = (event) => {
        event.preventDefault()
        this.setState({ searchWorld: event.target.value })
    }

    render() {
        const { 
            friends, friendList, community, 
            communityList, world, worldList, 
            loading, searchFriend, searchCommunity, 
            searchWorld, 
        } = this.state

        const friendSearch = searchFriend
            ? friends.filter(friend => friend.first_name.toLowerCase().includes(searchFriend.toLowerCase())
                || friend.last_name.toLowerCase().includes(searchFriend.toLowerCase())).map(user => this.userToList(user))
            : []

        const communitySearch = searchCommunity
            ? community.filter(friend => friend.first_name.toLowerCase().includes(searchCommunity.toLowerCase())
                || friend.last_name.toLowerCase().includes(searchCommunity.toLowerCase())).map(user => this.userToList(user))
            : []

        const worldSearch = searchWorld
            ? world.filter(friend => friend.first_name.toLowerCase().includes(searchWorld.toLowerCase())
                || friend.last_name.toLowerCase().includes(searchWorld.toLowerCase())).map(user => this.userToList(user))
            : []

        if (loading) {
            return <img className='loading' src='https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif' alt='loading' />
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
                            <form>
                                <input
                                    onChange={(event) => this.handleSearchPeople(event)}
                                    value={searchFriend}
                                    placeholder='Search People' />
                                <button>Search</button>
                            </form>
                            <ul>
                                {friendSearch.length ? friendSearch : friendList}
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My Community</h2>
                        <div className='column-box'>
                            <form>
                                <input
                                    onChange={(event) => this.handleSearchCommunity(event)}
                                    value={searchCommunity}
                                    placeholder='Search Community' />
                                <button>Search</button>
                            </form>
                            <ul>
                                {communitySearch.length ? communitySearch : communityList}
                            </ul>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My World</h2>
                        <div className='column-box'>
                            <form>
                                <input
                                    onChange={(event) => this.handleSearchWorld(event)}
                                    value={searchWorld}
                                    placeholder='Search World' />
                                <button>Search</button>
                            </form>
                            <ul>
                                {worldSearch.length ? worldSearch : worldList}
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
