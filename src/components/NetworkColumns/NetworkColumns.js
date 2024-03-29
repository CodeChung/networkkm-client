import React from 'react'
import { Link } from 'react-router-dom'
import NetworkApiService from '../../services/network-api-service'
import { debug } from 'util'
import PendingRequests from './PendingRequests'
import FriendRequests from './FriendRequests'
import { Button } from '../Utils/Utils'

class NetworkColumns extends React.Component {
    state = {
        loading: true,
        addFriendsCommunity: [],
        addFriendsWorld: [],
        pendingFriends: [],
        friends: [],
        friendList: [],
        community: [],
        communityList: [],
        world: [],
        worldList: [],
        searchFriend: '',
        searchCommunity: '',
        searchWorld: '',
        modalOpen: false,
    }

    componentDidMount() {
        NetworkApiService.getFriends()
            .then(network => {
                let friendList = network.friends.map(user => this.userToList(user))
                let communityList = network.community.map((user, index) => this.userToList(user, 'community', index))
                let worldList = network.world.map((user, index) => this.userToList(user, 'world', index))

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
            .catch(err => console.log(err))
    }

    userToList(user, list, index) {
        // Converts user json object to JSX
        return (
            <div className='row-friend' key={user.id}>
                <label>
                    <li onClick={() => this.props.openProfile(user.id)}>{`${user.first_name} ${user.last_name}`}</li>
                    <input onChange={() => this.toggleAddFriend(user, list, index)} type='checkbox' key={user.id} />
                </label>
            </div>
        )
    }

    toggleAddFriend = (user, list, indexNumber) => {
        // when you click on checkbox, it adds user object to potential add list
        const { addFriendsCommunity, addFriendsWorld } = this.state
        const index = list === 'community' 
            ? addFriendsCommunity.findIndex(friend => user.id === friend.id) 
            : addFriendsWorld.findIndex(friend => user.id === friend.id)

        if (list === 'community') {
            if (index < 0) {
                addFriendsCommunity.push({ user, indexNumber })
            } else {
                addFriendsCommunity.splice(index, 1)
            }
        } else {
            if (index < 0) {
                addFriendsWorld.push({ user, indexNumber })
            } else {
                addFriendsWorld.splice(index, 1)
            }
        }

        this.setState({ addFriendsCommunity, addFriendsWorld })
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

    sendRequests = () => {
        let { pendingFriends, addFriendsCommunity, addFriendsWorld, community, world, } = this.state
        let newCommunity = []
        let newWorld = []
        
        community.forEach(friend => {
            if (addFriendsCommunity.find(user => friend.id === user.id) === -1) {
                newCommunity.push(friend)
            }
        })

        world.forEach(friend => {
            if (addFriendsWorld.find(user => user.id === friend.id) === -1) {
                newWorld.push(friend)
            }
        })

        this.setState({ 
            pendingFriends: [...pendingFriends, ...addFriendsCommunity, ...addFriendsWorld], 
            addFriendsCommunity: [],
            addFriendsWorld: [],
            community: newCommunity, 
            world: newWorld,
        })
    }

    requestsToList(list) {
        return list.map(item => <li key={item.id}>{item.first_name} {item.last_name}</li>)
    }

    render() {
        const { 
            addFriendsCommunity, addFriendsWorld,
            pendingFriends, friends, friendList, 
            searchFriend, community, communityList, 
            searchCommunity, world, worldList, searchWorld, 
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


        return (
            <section className='home-columns'>
                <div className='home-column'>
                    <h2>Alerts</h2>
                    <div className='column-box'>
                        <FriendRequests />
                        <ul>
                            <li>See Pictures</li>
                        </ul>
                    </div>
                </div>
                <div className='home-column'>
                    <h2>Network<span className='col-count'>{friendSearch.length ? friendSearch.length : friendList.length}</span></h2>
                    <div className='column-box'>
                        <form>
                            <input
                                onChange={(event) => this.handleSearchPeople(event)}
                                value={searchFriend}
                                placeholder='Search People' />
                            <button>Search</button>
                        </form>
                        <h3>Pending</h3>
                        <PendingRequests />
                        {!!this.props.newFriend && this.userToList(this.props.newFriend)}
                        {pendingFriends.map(friend => this.userToList(friend.user))}
                        <ul></ul>
                        <h3>Friends</h3>
                        <form>
                            {friendSearch.length ? friendSearch : friendList}
                        </form>
                    </div>
                </div>
                <div className='home-column'>
                    <h2>Community<span className='col-count'>{communitySearch.length ? communitySearch.length : communityList.length}</span></h2>
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
                    <h2>World<span className='col-count'>{worldSearch.length ? worldSearch.length : worldList.length}</span></h2>
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
                            <li><Button onClick={this.props.openBlog}>Blog</Button></li>
                            <li><Button>Photos</Button></li>
                            <li><Link to='/'><Button>Events</Button></Link></li>
                            <li><Link to='/'><Button>Groups</Button></Link></li>
                        </ul>
                    </div>
                </div>
                {(!!addFriendsCommunity.length || !!addFriendsWorld.length) && 
                    <div className='add-friends'>
                        <button onClick={this.sendRequests}>Add Friends</button>
                    </div>
                }
            </section>
        )
    }
}

export default NetworkColumns