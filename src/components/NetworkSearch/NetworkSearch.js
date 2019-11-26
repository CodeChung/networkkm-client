import React from 'react'
import NetworkApiService from '../../services/network-api-service'

class NetworkSearch extends React.Component {
    state = {
        search: '',
        results: [],
        error: '',
    }
    handleSearchInput = (event) => {
        this.setState({ search: event.target.value })
    }
    handleSearchSubmit = (event) => {
        event.preventDefault()
        const { search } = this.state
        debugger
        NetworkApiService.findUser(search)
            .then(results => {
                console.log(results)
                this.setState({ results, search: '' })
            })
            .catch(res =>this.setState({ error: res.error }))
    }
    render() {
        return (
            <div className='network-search'>
                {this.state.error}
                <input
                    onChange={(event) => this.handleSearchInput(event)} 
                    value={this.state.search} 
                    placeholder='Search for a Friend within the Network' />
                <button onClick={(e) => this.handleSearchSubmit(e)}>Search</button>
                {JSON.stringify(this.state.results)}
            </div>
        )
    }
}

export default NetworkSearch