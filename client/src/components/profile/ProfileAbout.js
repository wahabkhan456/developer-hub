import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';


class ProfileAbout extends Component {
    state = {  }
    render() {

        const {profile} =this.props;

        const firstName=profile.user.name.split(" ")[0];

        console.log(firstName);

        const skillsSet=profile.skills.map(skill=>(
            <div key={skill} className="p-3">
                      <i className="fa fa-check"></i> {skill}</div>
        ))

        return (
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{`${firstName}'s Bio`}</h3>
                {isEmpty(profile.bio)? `${firstName} does not have a bio` : (<p className="lead">{profile.bio}</p>)}
                
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    
                  {skillsSet}
                  </div>
                </div>
              </div>
            </div>
          </div>

        );
    }
}

export default ProfileAbout;