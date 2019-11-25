import React from 'react'
import './BlogComments.css'
import NetworkApiService from '../../services/network-api-service'
import { Button } from '../Utils/Utils'

class BlogComments extends React.Component {
    state = {
        comments: [],
        error: false
    }
    componentDidMount() {
        NetworkApiService.getBlogComments(this.props.blogId)
            .then(comments => this.setState({ comments }))
            .catch(res => this.setState({ error: res.error }))
    }
    componentDidUpdate(prevProps) {
        if (this.props.blogId !== prevProps.blogId) {
            NetworkApiService.getBlogComments(this.props.blogId)
                .then(comments => this.setState({ comments }))
                .catch(res => this.setState({ error: res.error }))
        }
    }
    render() {
        const { comments, error, } = this.state
        return (
            <div className='blog-comments'>
                {error}
                {comments.map(comment => (
                    <div key={comment.id}>
                        {comment.comment}
                        {(new Date(comment.date_created)).toDateString()}
                    </div>
                ))}
                <form>
                    <label>Add Comment
                        <input />
                        <Button>Save</Button>
                    </label>
                </form>
            </div>
        )
    }
}

export default BlogComments