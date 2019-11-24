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
        debugger
        NetworkApiService.getUserBlog()
            .then(posts => {
                this.setState({ posts })
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