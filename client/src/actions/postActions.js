import axios from 'axios';
import { ADD_POST, GET_ERRORS,GET_POSTS,SET_POSTS_LOADING,DELETE_POST ,GET_POST} from './types';

export const addPost =postData=>dispatch=>{

    axios.post('/api/posts',postData)
        .then(res=>{
            dispatch({
                type:ADD_POST,
                payload:res.data
            })
        })
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }));

}

export const getPost=id=>dispatch=>{
    dispatch(setPostsLoading());
    
    axios.get(`/api/posts/${id}`)
        .then(res=>dispatch({
            type:GET_POST,
            payload:res.data

        }))
        .catch(err=>dispatch({
            type:GET_POST,
            payload:{}
        }))
}

export const getPosts =()=>dispatch=>{

    dispatch(setPostsLoading());

    axios.get('/api/posts/')
        .then(res=>dispatch({
            type:GET_POSTS,
            payload:res.data
        }))
        .catch(err=>dispatch({
            type:GET_POSTS,
            payload:null
        }))
};

export const deletePost=id=>dispatch=>{
    axios.delete(`/api/posts/${id}`)
        .then(res=>{
            dispatch({
                type:DELETE_POST,
                payload:id
            })
        })
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const addLike=postId=>dispatch=>{
    axios.post(`/api/posts/like/${postId}`)
        .then(res=>dispatch(getPosts()))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
};

export const removeLike=postId=>dispatch=>{
    axios.post(`/api/posts/unlike/${postId}`)
        .then(res=>dispatch(getPosts()))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }));
};

export const addComment=(commentData,postId)=>dispatch=>{
    axios.post(`/api/posts/comment/${postId}`,commentData)
        .then(res=>dispatch({
            type:GET_POST,
            payload:res.data
        }))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }));
}

export const deleteComment=(postId,commentId)=>dispatch=>{
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res=>dispatch({
            type:GET_POST,
            payload:res.data
        }))
        .catch(err=>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }));
}

export const setPostsLoading=()=>{
    return {
        type:SET_POSTS_LOADING
    }
}