import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({errors:nextProps.errors});
      }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const {postId}=this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    console.log(postId,newComment);

    this.props.addComment(newComment,postId);
  };

  render() {
    const { post } = this.props.posts;
    const {errors}=this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
              <TextAreaFieldGroup
                  placeholder="Write a comment"
                  name="text"
                  info={post.name?`Reply to ${post.name}`:''} 
                  error={errors.text}
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  errors:state.error
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
