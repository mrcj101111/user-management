import axios from 'axios';

export const GET_USERS_BEGIN = 'GET_USERS_BEGIN';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SEARCH_USERS = 'SEARCH_USERS;'

export const UPDATE_ACTIVE_USER = 'UPDATE_ACTIVE_USER';

export const IS_VIEW_MODAL_OPEN = 'IS_VIEW_MODAL_OPEN';
export const IS_EDIT_MODAL_OPEN = 'IS_EDIT_MODAL_OPEN';

export const ADD_FORM_ERRORS = 'ADD_FORM_ERRORS';

export const getUsersBegin = () => ({
    type: GET_USERS_BEGIN
});

export const updateActiveUser = (activeUser) => ({
    type: UPDATE_ACTIVE_USER,
    payload: { activeUser }
})

export const getUsersSuccess = users => ({
    type: GET_USERS_SUCCESS,
    payload: { users }
});

export const getUsersFailure = error => ({
    type: GET_USERS_FAILURE,
    payload: { error }
});

export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: { id }
})

export const isViewModalOpen = () => ({
    type: IS_VIEW_MODAL_OPEN,
});

export const isEditModalOpen = () => ({
    type: IS_EDIT_MODAL_OPEN,
})

export const updatedUser = (updatedUser) => ({
    type: UPDATE_USER,
    payload: { updatedUser }
})

export const searchAllUsers = (data) => ({
    type: SEARCH_USERS,
    payload: { data }
})

export const addFormErrors = (error) => ({
    type: ADD_FORM_ERRORS,
    payload: { error }
})

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

export const toggleModal = (activeUser) => {
    const activeUserObject = {};

    //Take data from json object and flatten in order for simple implementation in components.
    Object.entries(activeUser).map(([key, value]) => {
        if (typeof value === "object") {
            return Object.entries(value).map(([key, value]) => {
                if (typeof value === "object") {
                    return Object.entries(value).map(([key, item]) => {
                        return (
                            activeUserObject[key] = item
                        )
                    })
                } else {
                    return (
                        //Change name of entry to avoid conflict with name of user.
                        key === 'name' ? activeUserObject['company ' + key] = value : activeUserObject[key] = value
                    )
                }
            })
        }
        else {
            return (
                activeUserObject[key] = value
            )
        }
    })

    return dispatch => {
        dispatch(updateActiveUser(activeUserObject));
    }
}

export const updateUser = (data) => {
    return dispatch => {
        dispatch(updatedUser(data))
    }
}

export const searchUsers = (data) => {
    return dispatch => {
        dispatch(searchAllUsers(data.target.value))
    }
}

export const formError = (data) => {
    const error = {};
    const validEmailRegex = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    return dispatch => {
        return dispatch(addFormErrors(validEmailRegex.test(data.target.value) ? error[data.target.name] = '' : error[data.target.name] = 'Please provide a vaid email'));
    }
}
