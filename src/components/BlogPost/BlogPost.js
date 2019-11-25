import React from 'react'
import './BlogPost.css'
import { Button } from '../Utils/Utils'

class BlogPost extends React.Component {
    render() {
        return (
            <div className={this.props.current === this.props.id ? 'blog-post current-blog' : 'blog-post'} onClick={() => this.props.setBlog(this.props.id)}>
                <div className='blog-post-header'>
                    <img className='blog-post-avatar' src='https://www.placecage.com/400/400' alt='avatar' />
                    <div className='blog-post-title'>
                        <h2>{this.props.title}</h2>
                        <h3>{(new Date(this.props.date)).toDateString()}</h3>
                    </div>
                </div>
                <div className='blog-post-body'>
                    {this.props.html}
                </div>
                <Button>Read More</Button>
            </div>
        )
    }
}

export default BlogPost