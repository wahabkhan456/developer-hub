import React, { Component } from "react";
import { connect } from "react-redux";
import {getProfiles} from '../../actions/profileActions';
import Spinner from "../common/Spinner";
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  state = {};

  componentDidMount(){
      this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profileContent;

    if(profiles===null || loading){
        profileContent=<Spinner/>;
    }
    else if(profiles.length>0){

        profileContent=profiles.map(profile=>(
          <ProfileItem key={profile._id} profile={profile}/>
        ))
    }
    else{
        profileContent=<h2>No Profiles found...</h2>
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>
            {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
