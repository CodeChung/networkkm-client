import React from 'react'
import { Button } from '../Utils/Utils'
import { TiFeather } from 'react-icons/ti'
import './Blog.css'


class Blog extends React.Component {
    render() {
        return (
            <div className='blog'>
                Kenny Bloggins
                <Button className='new-blog-post'><TiFeather /> New Post</Button>
            </div>
        )
    }
}

export default Blog