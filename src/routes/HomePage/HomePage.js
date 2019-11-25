import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../components/Utils/Utils'
import './HomePage.css'
import NetworkApiService from '../../services/network-api-service'
import Modal from '../../components/Modal/Modal'
import Invitation from '../../components/Invitation/Invitation'
import NetworkSearch from '../../components/NetworkSearch/NetworkSearch'
import NetworkColumns from '../../components/NetworkColumns/NetworkColumns'
import Profile from '../../components/Profile/Profile'
import Blog from '../../components/Blog/Blog'


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
        openBlog: false,
        currentProfile: null,
        user: null,
    }

    componentDidMount() {
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

    toggleBloggle = () => {
        this.setState({ openBlog: !this.state.openBlog })
    }

    toggleSearch = () => {
        this.setState({ openSearch: !this.state.openSearch })
    }

    toggleProfile = () => {
        this.setState({ currentProfile: null })
    }

    passFriend = (friend) => {
        this.setState({ newFriend: friend })
    }

    setProfile = (id) => {
        this.setState({ currentProfile: id })
    }
    
    render() {
        const { 
            loading, modalOpen, openSearch, openBlog, currentProfile
        } = this.state

        if (loading) {
            return <img className='loading' src='https://media1.tenor.com/images/d6cd5151c04765d1992edfde14483068/tenor.gif' alt='loading' />
        }
        return (
            <Section className='HomePage'>
                <NetworkColumns 
                    newFriend={this.state.newFriend} 
                    openProfile={this.setProfile} 
                    openBlog={this.toggleBloggle}
                />
                <Modal close={this.toggleModal} active={modalOpen}>
                    <Invitation addFriend={(friend) => this.passFriend(friend)} />
                </Modal>
                <Modal close={this.toggleSearch} active={openSearch}>
                    <NetworkSearch />
                </Modal>
                <Modal close={this.toggleProfile} active={currentProfile}>
                    <Profile id={currentProfile} />
                </Modal>
                <Modal close={this.toggleBloggle} active={openBlog}>
                    <Blog />
                </Modal>
                <button onClick={this.toggleModal}>Add Members To <br/> Your Network</button>
                <button onClick={this.toggleSearch}>Search For Someone <br/> Within The Network</button>
            </Section>
        )
    }
}
