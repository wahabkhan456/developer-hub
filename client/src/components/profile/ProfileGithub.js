import React, { Component } from 'react';
class ProfileGithub extends Component {
    state = {
        clientID:'a97d13dc382eb32fa106',
        clientSecret:'5072eb033c9629eba03289d53163a4d417b8ee9c',
        sort:'created:asc',
        count:5,
        repos:[]
      }

      componentDidMount(){

        const {username}=this.props;

        const {count,sort,clientID,clientSecret}=this.state;

          fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`)
            .then(res=>res.json())
            .then(data=>{
                if(this.refs.myRef){
                this.setState({repos:data});
            }
            })
            .catch(err=>console.log(err));
      }

    render() {

        const {repos}=this.state;

        if(repos){
            console.log(repos);
        }
        const repoItems=repos.map(repo=>(
                
        <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank">{repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars:{repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
      
        
        ))

        return (
            <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {repoItems}
          </div>
        );
    }
}

export default ProfileGithub;