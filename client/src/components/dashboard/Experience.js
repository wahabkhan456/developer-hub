import React, { Component } from 'react';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileActions';
import { connect } from "react-redux";
class Experience extends Component {
  state = {};

  onClickDelete=id=>{
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp=>(
        <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td><Moment format="YYYY/MM/DD">{exp.from}</Moment>-{' '}{exp.to===null?'Now':<Moment format="YYYY/MM/DD">{exp.to}</Moment>}</td>
        <td><button className="btn btn-danger" onClick={()=>this.onClickDelete(exp._id)}>Delete</button></td>
        </tr>
    ));

    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table" >
        <thead>
            <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Years</th>
                <th></th>

            </tr>

        </thead>
        <tbody>
            {experience}

        </tbody>
        </table>
      </div>
    );
  }
}

export default connect(null,{deleteExperience})(Experience);
