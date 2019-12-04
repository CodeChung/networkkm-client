import React from 'react'
import { Button } from '../Utils/Utils'
import { TiFeather } from 'react-icons/ti'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './Blog.css'
import BlogFeed from './BlogFeed'
import BlogComments from '../BlogComments/BlogComments'
import NetworkApiService from '../../services/network-api-service'
import { convertFromRaw } from 'draft-js'


const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class Blog extends React.Component {
    state = {
        newPost: false,
        currentPost: null,
        contentState: convertFromRaw(content)
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
    publishPost = () => {
        const newBlog = {
            author: 1,
            title: 'new title',
            html: this.state.contentState,
            readers: []
        }
        console.log(newBlog)
        NetworkApiService.publishBlogPost(newBlog)
            .then(newPost => {
                console.log(newPost)
            })
            .catch(res => this.setState({ error: res.error }))
    }
    handleTitle = (e) => {
        this.setState({ title: e.target.value})
    }
    onContentStateChange = (contentState) => {
        this.setState({ contentState })
    }
    render() {
        const { newPost, currentPost, title } = this.state
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
                                <input value={title} onChange={(e) => this.handleTitle(e)}/>
                            </label>
                            <Editor 
                                onContentStateChange={this.onContentStateChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                            /> 
                            <Button onClick={this.publishPost} className='save-post'>Save</Button>
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