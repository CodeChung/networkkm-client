import React from 'react'
import './Modal.css'

class Modal extends React.Component {
    state = {
        active: false
    }
    render() {
        if (this.props.active) {
            return (
                <div className='modal'>
                    <div className='modal-backdrop'>
                        {this.props.children}
                    </div>
                    <div onClick={this.props.close} className='close-modal'>
                        <div className='open-modal'>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Modal