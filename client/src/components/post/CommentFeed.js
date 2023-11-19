import React, { Component } from 'react';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
    state = {  }
    render() {

        const {comments,postId}=this.props;

        return comments.map(comment=>(
            <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))
            
        ;
    }
}

export default CommentFeed;