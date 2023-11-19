import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile,deleteAccount } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Education from './Education';
import Experience from './Experience';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick=()=>{
      this.props.deleteAccount();
  }

  render() {
    const {  user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="dashboard">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    <p className="lead text-muted">
                      Welcome{" "}
                      <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                    </p>

                    <ProfileActions />
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education}/>


                    <div style={{ marginBottom: "60px" }}>
                      <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h1>{`Welcome ${user.name}`}</h1>
            <p>
              You need to create a profile as you have no profile set up.Please
              provide some info now.
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return <div>{dashboardContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile,deleteAccount }
)(Dashboard);
