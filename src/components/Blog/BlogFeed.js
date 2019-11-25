import React from 'react'
import NetworkApiService from '../../services/network-api-service'
import { debug } from 'util'
import BlogPost from '../BlogPost/BlogPost'

class BlogFeed extends React.Component {
    state = {
        posts: [],
        error: '',
    }
    componentDidMount() {
        NetworkApiService.getUserBlog()
            .then(posts => {
                this.setState({ posts })
                this.props.setBlog(posts[0].id)
            })
            .catch(res => this.setState({ error: res.error }))
    }
    render() {
        const { posts, error } = this.state
        return (
            <div className='blog-feed'>
                {error}
                {posts.map((post, index) => 
                    <BlogPost 
                        current={this.props.current}
                        id={post.id}
                        setBlog={this.props.setBlog}
                        key={index} 
                        title={post.title}
                        date={post.date}
                        html={post.html}
                    />
                )}
            </div>
        )
    }
}

export default BlogFeed