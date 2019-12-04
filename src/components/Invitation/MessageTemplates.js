import React from 'react'
import './Invitation.css'
import { Button } from '../Utils/Utils'

class MessageTemplates extends React.Component {
    state = {
        current: null,
        msg1: 'Yo its Keith. Join me at NetworkKM, a new social media network',
        msg2: 'Hey there friend. Im a member of NetworkKM and I want you to join so we can be friends',
        msg3: 'Wanna join me at NetworkKM? I love it there and Im sure youll love it too',
        msg4: 'I think youll really enjoy NetworkKM, why dont you check it out? I use it all the time',
        msg5: 'I used to be a loser, till I discovered NetworkKM. Now my network is stronger than ever! Check it out',
    }
    handleMessage = (ev, number) => {
        this.setState({ [`msg${number}`]: ev.target.value })
    }
    setCurrentMessage = (number) => {
        this.setState({ current: number })
    }
    render() {
        const { current } = this.state
        return (
            <div className='message-templates'>
                <h2>MessageTemplates</h2>
                <textarea
                    className={current === 1 ? 'active-message' : ''}
                    onClick={() => this.setCurrentMessage(1)}
                    onChange={(ev) => this.handleMessage(ev, 1)}
                    rows={5}
                    value={this.state.msg1} />
                <textarea
                    className={current === 2 ? 'active-message' : ''}
                    onClick={() => this.setCurrentMessage(2)}
                    onChange={(ev) => this.handleMessage(ev, 2)}
                    rows={5}
                    value={this.state.msg2} />
                <textarea
                    className={current === 3 ? 'active-message' : ''}
                    onClick={() => this.setCurrentMessage(3)}
                    onChange={(ev) => this.handleMessage(ev, 3)}
                    rows={5}
                    value={this.state.msg3} />
                <textarea
                    className={current === 4 ? 'active-message' : ''}
                    onClick={() => this.setCurrentMessage(4)}
                    onChange={(ev) => this.handleMessage(ev, 4)}
                    rows={5}
                    value={this.state.msg4} />
                <textarea
                    className={current === 5 ? 'active-message' : ''}
                    onClick={() => this.setCurrentMessage(5)}
                    onChange={(ev) => this.handleMessage(ev, 5)}
                    rows={5}
                    value={this.state.msg5} />
                <Button onClick={this.props.send}>Send</Button>
            </div>
        )
    }
}

export default MessageTemplates