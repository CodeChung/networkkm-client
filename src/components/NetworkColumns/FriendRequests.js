import React from 'react'
import NetworkApiService from '../../services/network-api-service'
import { Link } from 'react-router-dom'

class FriendRequests extends React.Component {
    state = {
        requests: []
    }
    componentDidMount() {
        NetworkApiService.checkFriendRequests()
            .then(requests => {
                this.setState({ requests})
            })
    }
    userToList(user, list, index) {
        // Converts user json object to JSX
        return (
            <div key={user.id}>
                <label>
                    <Link to={`/user/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link>
                    <button onClick={() => this.acceptRequest(user.id)}>Yes</button>
                    <button>No</button>
                </label>
            </div>
        )
    }
    acceptRequest(friendId) {
        NetworkApiService.acceptFriendRequest(friendId)
            .then(newFriend => {
                this.setState({ 
                    requests: this.state.requests.filter(
                        req => req.sender !== newFriend.id 
                    )
                })
            })
            .catch(res => this.setState({ error: res.error }))
    }
    deleteRequest(friendId) {

    }
    render() {
        const { error, requests } = this.state
        return (
            <div>
                <h3>Friend Requests</h3>
                {error}
                {
                    !!requests.length 
                    && 
                    requests.map(request =>
                        this.userToList(request)
                    )
                }
            </div>
        )
    }
}

export default FriendRequests