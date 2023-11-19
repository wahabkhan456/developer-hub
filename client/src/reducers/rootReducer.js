import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import ProfileReducer from './profileReducer';
import PostsReducer from './postsReducer';

const rootReducer=combineReducers({

    auth:authReducer,
    error:errorReducer,
    profile:ProfileReducer,
    posts:PostsReducer

});

export default rootReducer;