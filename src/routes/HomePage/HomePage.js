import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Utils/Utils'
import './HomePage.css'
import NetworkApiService from '../../services/network-api-service'
import Checkbox from '../../components/Utils/Checkbox'

export default class HomePage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    state = {
        loading: true,
        addFriends: [],
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
        return (
            <div>
                <label>
                    <Link to={`/user/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link>
                    <input onChange={() => this.toggleAddFriend(user.id)} type='checkbox' key={user.id} />
                </label>
            </div>
        )
    }

    toggleAddFriend = (userId) => {
        const { addFriends } = this.state
        const index = addFriends.findIndex(friend => userId === friend) 

        if (index < 0) {
            addFriends.push(userId)
        } else {
            addFriends.splice(index, 1)
        }

        this.setState({ addFriends })
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
            addFriends,
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
                        <h2>My People<span className='col-count'>{friendSearch.length ? friendSearch.length : friendList.length}</span></h2>
                        <div className='column-box'>
                            <form>
                                <input
                                    onChange={(event) => this.handleSearchPeople(event)}
                                    value={searchFriend}
                                    placeholder='Search People' />
                                <button>Search</button>
                            </form>
                            <h3>Pending</h3>
                            {addFriends}
                            <ul></ul>
                            <h3>Friends</h3>
                            <form>
                                {friendSearch.length ? friendSearch : friendList}
                            </form>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My Community<span className='col-count'>{communitySearch.length ? communitySearch.length : communityList.length}</span></h2>
                        <div className='column-box'>
                            <form>
                                <input
                                    onChange={(event) => this.handleSearchCommunity(event)}
                                    value={searchCommunity}
                                    placeholder='Search Community' />
                                <button>Search</button>
                            </form>
                            <form>
                                {communitySearch.length ? communitySearch : communityList}
                            </form>
                        </div>
                    </div>
                    <div className='home-column'>
                        <h2>My World<span className='col-count'>{worldSearch.length ? worldSearch.length : worldList.length}</span></h2>
                        <div className='column-box'>
                            <form>
                                <input
                                    onChange={(event) => this.handleSearchWorld(event)}
                                    value={searchWorld}
                                    placeholder='Search World' />
                                <button>Search</button>
                            </form>
                            <form>
                                {worldSearch.length ? worldSearch : worldList}
                            </form>
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
                <button>Search Members</button>
            </Section>
        )
    }
}
