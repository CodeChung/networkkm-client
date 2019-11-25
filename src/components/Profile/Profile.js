import React from 'react'
import Modal from '../Modal/Modal'
import './Profile.css'
import NetworkApiService from '../../services/network-api-service'
import BlogPost from '../BlogPost/BlogPost'
import { debug } from 'util'

class Profile extends React.Component {
    state = {
        user: null,
        loading: true,
        openForm: false,
        posts: [],
        error: '',
        curentBlog: null,
    }
    componentDidMount() {
        NetworkApiService.findUserById(this.props.id)
            .then(user => {
                NetworkApiService.getBlogByUser(user.id)
                    .then(posts => {
                        this.setState({ posts, user, loading: false })
                    })
                    .catch(res => this.setState({ error: res.error }))
            })
    }
    toggleForm = () => {
        this.setState({ openForm: !this.state.openForm })
    }
    submitForm = (event) => {
        event.preventDefault()
    }
    setCurrentBlog = (blogId) => {
        this.setState({ currentBlog: blogId })
    }
    render() {
        const { currentBlog, loading, user, openForm, posts } = this.state
        if (loading) {
            return (<div></div>)
        }
        else {
            return (
                <div className='profile'>
                    <div className='profile-name'>
                        <h2>{user.first_name} {user.last_name}</h2>
                        <img src='https://www.placecage.com/300/400' alt='profile' />
                        <button onClick={this.toggleForm}>Edit Member Info</button>
                    </div>
                    <div className='profile-blog'>
                        <h2>{user.first_name}'s Blog</h2>
                        <div className='profile-blog-container'>
                            {posts.map((post, index) =>
                                <BlogPost
                                    current={currentBlog}
                                    id={post.id}
                                    setBlog={this.setCurrentBlog}
                                    key={index}
                                    title={post.title}
                                    date={post.date}
                                    html={post.html}
                                />
                            )}
                        </div>
                    </div>
                    <div className='profile-events'>
                        <h2>{user.last_name}'s Events</h2>
                        This user has no events yet
                    </div>
                    <Modal close={this.toggleForm} active={openForm}>
                        <button className='profile-form-close' onClick={this.toggleForm}>Close</button>
                        <form onSubmit={(e) => this.submitForm(e)} className='profile-form'>
                            <label>
                                Address
                                <input />
                            </label>
                            <label>
                                City
                                <input />
                            </label>
                            <label>
                                State
                                <input />
                            </label>
                            <label>
                                Zip
                                <input />
                            </label>
                            <label>
                                Cell Phone
                                <input />
                            </label>
                            <button>Save</button>
                        </form>
                    </Modal>
                </div>
            )
        }
    }
}

export default Profile