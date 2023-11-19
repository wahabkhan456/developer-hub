import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import SelectFieldGroup from "../common/SelectFieldGroup";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    website: "",
    company: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    instagram: "",
    youtube: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");

      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.social.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.social.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      

      this.setState({
        handle: profile.handle,
        website: profile.website,
        company: profile.company,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        bio: profile.bio,
        githubusername: profile.githubusername,
        instagram: profile.social.instagram,
        youtube: profile.social.youtube,
        facebook: profile.social.facebook,
        twitter: profile.social.twitter,
        linkedin: profile.social.linkedin
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userProfile = {
      ...this.state
    };

    this.props.createProfile(userProfile, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Mid level Developer", value: "Mid level Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Intern", value: "Intern" },
      { label: "Teacher", value: "Teacher" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Other", value: "Other" }
    ];

    let socialMediaInputs;

    if (displaySocialInputs) {
      socialMediaInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            onChange={this.onChange}
            value={this.state.twitter}
            icon="fab fa-twitter"
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            onChange={this.onChange}
            value={this.state.facebook}
            icon="fab fa-facebook"
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            onChange={this.onChange}
            value={this.state.instagram}
            icon="fab fa-instagram"
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            onChange={this.onChange}
            value={this.state.youtube}
            icon="fab fa-youtube"
            error={errors.youtube}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                  error={errors.handle}
                  value={this.state.handle}
                  onChange={this.onChange}
                />
                <SelectFieldGroup
                  name="status"
                  info="Give us an idea of where you are at in your career"
                  error={errors.status}
                  options={options}
                  onChange={this.onChange}
                  value={this.state.status}
                />

                <TextFieldGroup
                  placeholder="Select Company"
                  name="company"
                  info="Could be your own company or one you work for"
                  value={this.state.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Select Website"
                  name="website"
                  info="Could be your own or a company website"
                  error={errors.website}
                  onChange={this.onChange}
                  value={this.state.website}
                />

                <TextFieldGroup
                  placeholder="Select Location"
                  name="location"
                  info="City &amp; state suggested (eg. Boston, MA)"
                  error={errors.location}
                  onChange={this.onChange}
                  value={this.state.location}
                />

                <TextFieldGroup
                  placeholder="Select Skills"
                  name="skills"
                  info="Please use comma separated values (eg. HTML, CSS,JavaScript,PHP)"
                  error={errors.skills}
                  onChange={this.onChange}
                  value={this.state.skills}
                />

                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  info="If you want your latest repos and a Github link, include your username"
                  error={errors.githubusername}
                  onChange={this.onChange}
                  value={this.state.githubusername}
                />

                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  info="Tell us a little about yourself"
                  error={errors.bio}
                  value={this.state.bio}
                  onChange={this.onChange}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialMediaInputs}

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
  errors: state.error,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile
  }
)(withRouter(EditProfile));
