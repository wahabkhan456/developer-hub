import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deletePost,addLike,removeLike } from "../../actions/postActions";
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PostItem extends Component {
  state = {};

  onDeleteClick=id=>{

    this.props.deletePost(id);
    
  }

  onLikeClick=postId=>{

    this.props.addLike(postId);
  }

  onUnlikeClick=postId=>{

    this.props.removeLike(postId);
  }

  findUserLikes=likes=>{

    const {auth}=this.props;

    return likes.filter(like=>like.user===auth.user.id).length>0;

  }


  render() {
    const { post, auth,showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions?(<span>
              <button onClick={()=>this.onLikeClick(post._id)} type="button" className="btn btn-light mr-1">
              <i className={classnames("fas fa-thumbs-up",{
                'text-info':this.findUserLikes(post.likes)
              })} />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button onClick={()=>this.onUnlikeClick(post._id)} type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button onClick={()=>this.onDeleteClick(post._id)} type="button" className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            ) : null}
    </span>):null}
          </div>
        </div>
      </div>
    );
  }
}


PostItem.defaultProps={
  showActions:true
}

PostItem.propTypes={
  auth:PropTypes.object.isRequired,
  posts:PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});



export default connect(
  mapStateToProps,
  {deletePost,addLike,removeLike}
)(PostItem);
