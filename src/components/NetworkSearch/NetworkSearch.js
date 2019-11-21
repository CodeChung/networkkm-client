import React from 'react'

class NetworkSearch extends React.Component {
    state = {
        search: '',
        results: [],
    }
    handleSearchInput = (event) => {
        this.setState({ search: event.target.value })
    }
    handleSearchSubmit = () => {

    }
    render() {
        return (
            <div>
                <input
                    onChange={(event) => this.handleSearchInput(event)} 
                    value={this.state.search} 
                    placeholder='Search for a Friend within the Network' />
                <button>Search</button>
                {this.state.results}
            </div>
        )
    }
}

export default NetworkSearch