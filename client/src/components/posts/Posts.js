import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";

class Posts extends Component {
  state = {};

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.posts;

    let postContent;

    if(loading){
        postContent=<Spinner/>
    }
    else if(posts.length>0){

        postContent=(
            
            <PostFeed posts={posts}/>
        )
    }
    else if(posts===null || posts.length===0){
        postContent=(<h1>No Posts Found</h1>)
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
