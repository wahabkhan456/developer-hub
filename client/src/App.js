import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {Provider} from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {setCurrentUser} from './actions/authActions'; 
import {logoutUser} from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if(localStorage.jwt){

  setAuthToken(localStorage.jwt);

  const decoded=jwt_decode(localStorage.jwt);
  store.dispatch(setCurrentUser(decoded));

  const currentTime= Date.now() / 1000;

  console.log(currentTime);
  console.log(decoded.exp);

  if(decoded.exp < currentTime){

    store.dispatch(logoutUser());

    
    window.location.href='/login';

  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
         <Navbar/>
        <Route exact path="/" component={Landing}/>
        <div className="container">
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profile/:handle" component={Profile}/>
        
        <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        
        </Switch>
        <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-experience" component={AddExperience}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-education" component={AddEducation}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/feed" component={Posts}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/posts/:id" component={Post}/>
        </Switch>
        </div>
        <Footer/>
        <Route exact path="/not-found" component={NotFound} />
        
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
