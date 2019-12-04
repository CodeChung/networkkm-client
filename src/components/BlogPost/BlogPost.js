import React from 'react'
import './BlogPost.css'
import { Button } from '../Utils/Utils'
import draftToHtml from 'draftjs-to-html'
import { EditorState, convertToRaw, ContentState } from 'draft-js';

class BlogPost extends React.Component {
    state = {
        large: false
    }
    toggleLarge = () => {
        this.setState({ large: !this.state.large })
    }
    render() {
        const { large } = this.state
        return (
            <div className={this.props.current === this.props.id ? 'blog-post current-blog' : 'blog-post'} onClick={() => this.props.setBlog(this.props.id)}>
                <div className='blog-post-header'>
                    <img className='blog-post-avatar' src='https://www.placecage.com/400/400' alt='avatar' />
                    <div className='blog-post-title'>
                        <h2>{this.props.title}</h2>
                        <h3>{(new Date(this.props.date)).toDateString()}</h3>
                    </div>
                </div>
                {/* <div className={large ? 'blog-post-body blog-post-active' : 'blog-post-body'}>
                    {this.props.html}
                </div> */}
                <textarea
                    rows={10}
                    disabled
                    value={draftToHtml(this.props.html)}
                />
                <Button onClick={this.toggleLarge}>{large ? 'Show Less' : 'Read More'}</Button>
            </div>
        )
    }
}

export default BlogPost