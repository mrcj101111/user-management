import axios from 'axios';

export const GET_USERS_BEGIN = 'GET_USERS_BEGIN';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';


export const getUsersBegin = () => ({
    type: GET_USERS_BEGIN
});

export const getUsersSuccess = users => ({
    type: GET_USERS_SUCCESS,
    payload: { users }
});

export const getUsersFailure = error => ({
    type: GET_USERS_FAILURE,
    payload: { error }
});


export const getUsers = () => {
    return dispatch => {
        dispatch(getUsersBegin());
        return axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => res.data)
            .then(data => {
                dispatch(getUsersSuccess(data))
            })
            .catch(err => dispatch(getUsersFailure(err)))
    }
}