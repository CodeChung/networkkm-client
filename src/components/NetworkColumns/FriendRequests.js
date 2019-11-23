import React from 'react'
import NetworkApiService from '../../services/network-api-service'

class FriendRequests extends React.Component {
    state = {
        requests: []
    }
    componentDidMount() {
        // NetworkApiService.checkFriendRequests()
        //     .then(requests => {
        //         debugger
        //         this.setState({ requests})
        //     })
    }
    render() {
        return (
            <div>
                <h3>Friend Requests</h3>
                {/* {this.state.requests} */}
            </div>
        )
    }
}

export default FriendRequests