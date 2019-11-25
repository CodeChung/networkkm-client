import React from 'react'
import { Button } from '../Utils/Utils'
import { TiFeather } from 'react-icons/ti'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './Blog.css'
import BlogFeed from './BlogFeed'
import BlogComments from '../BlogComments/BlogComments'


class Blog extends React.Component {
    state = {
        newPost: false,
        currentPost: null,
    }
    toggleNewPost = () => {
        this.setState({ newPost: !this.state.newPost })
    }
    handleTabs = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault()
        }
    }
    setCurrentBlog = (blogId) => {
        this.setState({ currentPost: blogId })
    }
    render() {
        const { newPost, currentPost } = this.state
        const blogComments = currentPost ? <BlogComments blogId={currentPost} /> : ''
        return (
            <div className='blog'>
                <div className='blog-block blog-posts'>
                    <BlogFeed current={currentPost} setBlog={this.setCurrentBlog} />
                </div>
                <div className='blog-block blog-comments'>
                    {
                        newPost 
                        ? 
                        <div className='blog-wrapper' onKeyDown={this.handleTabs}>
                            <label className='post-title'>
                                Title
                                <input />
                            </label>
                            <Editor 
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                            /> 
                            <Button className='save-post'>Save</Button>
                        </div>
                        : 
                        blogComments
                    }
                </div>
                <Button onClick={this.toggleNewPost} className='new-blog-post'><TiFeather /> New Post</Button>
            </div>
        )
    }
}

export default Blog