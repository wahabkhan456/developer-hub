import React, { Component } from 'react';
import PostItem from './PostItem';

class PostFeed extends Component {
    state = {  }
    render() {

        const {posts}=this.props;

        return posts.map(post=>(
            <PostItem key={post._id} post={post}/>
        ))
    }
}

export default PostFeed;