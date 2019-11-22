import React from 'react'
import { Link } from 'react-router-dom'
import NetworkApiService from '../../services/network-api-service'

class PendingRequests extends React.Component {
    state = {
        requests: null,
    }
    componentDidMount() {
        NetworkApiService.getPendingRequest()
            .then(users => {
                console.log(users)
                let requests = users.map(user =>
                    <div key={user.id}>
                        <label>
                            <Link to={`/user/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link>
                            <input type='checkbox' key={user.id} />
                        </label>
                    </div>
                )

                this.setState({ requests })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {this.state.requests}
            </div>
        )
    }
}

export default PendingRequests