import React from 'react'
import './BlogComments.css'
import NetworkApiService from '../../services/network-api-service'
import { Button } from '../Utils/Utils'

class BlogComments extends React.Component {
    state = {
        comments: [],
        error: false,
        newComment: '',
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
    setComment = (event) => {
        this.setState({ newComment: event.target.value })
    }
    submitComment = (event) => {
        event.preventDefault()
        NetworkApiService.submitComment(this.props.blogId, this.state.newComment)
            .then(newComment => newComment)
            .catch(res => console.log(res))

        NetworkApiService.getUser()
            .then(user => this.setState({
                comments: [...this.state.comments, {
                    comment: this.state.newComment,
                    first_name: user.first_name,
                    date_created: new Date(),
                    last_name: user.last_name
                }],
                newComment: '',
            }))

    }
    render() {
        const { comments, newComment, error, } = this.state
        return (
            <div className='blog-comments'>
                {error}
                {comments.map((comment, index) => (
                    <div className='blog-comment' key={index}>
                        <div className='comment-wrapper'>
                            <div className='comment-name'>
                                {comment.first_name} {comment.last_name}:
                            </div>
                            <div className='comment-comment'>
                                {comment.comment}
                            </div>
                        </div>
                        <div className='comment-date'>
                            {(new Date(comment.date_created)).toDateString()}
                        </div>
                    </div>
                ))}
                <form onSubmit={(e) => this.submitComment(e)}>
                    <label>Add Comment
                        <input value={newComment} onChange={(event) => this.setComment(event)} />
                        <Button>Save</Button>
                    </label>
                </form>
            </div>
        )
    }
}

export default BlogComments