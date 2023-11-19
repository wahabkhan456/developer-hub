import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {addExperience} from '../../actions/profileActions';

class AddExperience extends Component {
  state = {
    title:'',
    company:'',
    location:'',
    from:'',
    to:'',
    description:'',
    current:false,
    disabled:false,
    errors: {}
  };

  onSubmit=e=>{
      e.preventDefault();

    const expData={
      title:this.state.title,
      company:this.state.company,
      location:this.state.location,
      from:this.state.from,
      to:this.state.to,
      description:this.state.description,
      current:this.state.current,
    }

    this.props.addExperience(expData,this.props.history);
  }

  onChange=e=>{
    this.setState({[e.target.name]:e.target.value});

  }

  onCheck=()=>{
      this.setState({
          disabled:!this.state.disabled,
          current:!this.state.current
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                {/* <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="* Job Title" name="title" required />
            </div> */}

                <TextFieldGroup
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  name="title"
                  placeholder="* Job Title"
                />
                <TextFieldGroup
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  name="company"
                  placeholder="* Company"
                />

                <TextFieldGroup
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  name="location"
                  placeholder="Location"
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  name="from"
                />

                <h6>To Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={this.state.to}
                    onChange={this.onChange}
                    name="to"
                    disabled={this.state.disabled}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    id="current"
                    onChange={this.onCheck}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  value={this.state.description}
                  onChange={this.onChange}
                  name="description"
                  placeholder="Add Job Description"
                  error={errors.description}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error
});

export default connect(
  mapStateToProps,
  {addExperience}
)(withRouter(AddExperience));
