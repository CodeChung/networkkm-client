import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Utils/Utils'
import './HomePage.css'
import NetworkApiService from '../../services/network-api-service'
import Modal from '../../components/Modal/Modal'
import Invitation from '../../components/Invitation/Invitation'
import NetworkSearch from '../../components/NetworkSearch/NetworkSearch'
import NetworkColumns from '../../components/NetworkColumns/NetworkColumns'


export default class HomePage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    state = {
        loading: true,
        modalOpen: false,
        openSearch: false,
        newFriend: null,
    }

    componentDidMount() {
        // NetworkApiService.getFriends()
        //     .then(network => {
        //         let friendList = network.friends.map(user => this.userToList(user))
        //         let communityList = network.community.map((user, index) => this.userToList(user, 'community', index))
        //         let worldList = network.world.map((user, index) => this.userToList(user, 'world', index))

        //         this.setState({
        //             friends: network.friends,
        //             friendList,
        //             community: network.community,
        //             communityList,
        //             world: network.world,
        //             worldList,
        //             loading: false
        //         })
        //     })
        //     .catch(err => console.log(err))
        this.setState({ loading: false })
    }

    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen })
    }

    userToList(user, list, index) {
        // Converts user json object to JSX
        return (
            <div key={user.id}>
                <label>
                    <Link to={`/user/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link>
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

    toggleSearch = () => {
        this.setState({ openSearch: !this.state.openSearch })
    }

    passFriend = (friend) => {
        this.setState({ newFriend: friend })
    }

    render() {
        const { 
            loading, modalOpen, openSearch
        } = this.state

        if (loading) {
            return <img className='loading' src='https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif' alt='loading' />
        }
        return (
            <Section className='HomePage'>
                <NetworkColumns newFriend={this.state.newFriend} />
                <Modal close={this.toggleModal} active={modalOpen}>
                    <Invitation addFriend={(friend) => this.passFriend(friend)} />
                </Modal>
                <Modal close={this.toggleSearch} active={openSearch}>
                    <NetworkSearch />
                </Modal>
                <button onClick={this.toggleModal}>Add Members To <br/> Your Network</button>
                <button onClick={this.toggleSearch}>Search For Someone <br/> Within The Network</button>
            </Section>
        )
    }
}
