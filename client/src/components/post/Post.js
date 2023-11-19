import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPost} from '../../actions/postActions';
import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';
import CommentFeed from './CommentFeed';

class Post extends Component {
    state = {  }

    componentDidMount(){
        if(this.props.match.params.id){
        this.props.getPost(this.props.match.params.id);
    }
}
    render() {

        const {post,loading}=this.props.posts;

        let postContent;

        if(post===null || loading || Object.keys(post).length===0){
            postContent=<Spinner/>;
        }
        else{
            postContent=(
                <div>
          <PostItem post={post} showActions={false}/>
          <CommentForm postId={post._id}/>
          <CommentFeed postId={post._id} comments={post.comments}/>
                </div>
            );
        }
        
        return (

            <div className="post">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
        <div className="row">
            <div className="col-6">
              <a href="/feed" className="btn btn-light mb-3 float-left">Back To Feed</a>
            </div>
            <div className="col-6"/>
          </div>
          
        {postContent}
            

          </div>
        </div>
      </div>
    </div>
  
            
        );
    }
}

const mapStateToProps=state=>({
    posts:state.posts
})

export default connect(mapStateToProps,{getPost})(Post);