import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";

class ProfileCreds extends Component {
  state = {};
  render() {
    const { profile } = this.props;

    const eduData = profile.education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {isEmpty(edu.to) ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          {isEmpty(edu.degree) ? null : (
            <span>
              <strong>Degree:</strong> {edu.degree}
            </span>
          )}
        </p>
        <p>
          {isEmpty(edu.fieldofstudy)? null:(<span><strong>Field Of Study: </strong>{edu.fieldofstudy}</span>)}
        </p>
        <p>
          {isEmpty(edu.description) ? null : (
            <span>
              <strong>Description:</strong>
              {edu.description}{" "}
            </span>
          )}
        </p>
      </li>
    ));

    const expData = profile.experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {isEmpty(exp.to) ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          {isEmpty(exp.title) ? null : (
            <span>
              <strong>Position:</strong> {exp.title}
            </span>
          )}
        </p>
        <p>
          {isEmpty(exp.location)? null:(<span><strong>Location: </strong>{exp.location}</span>)}
        </p>
        <p>
          {isEmpty(exp.description) ? null : (
            <span>
              <strong>Description:</strong>
              {exp.description}{" "}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expData.length>0 ? (<ul className="list-group">{expData}</ul>
):(<p className="text-center">No Experience Listed</p>)}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduData.length>0 ? (<ul className="list-group">{eduData}</ul>
):(<p className="text-center">No Education Listed</p>)}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
