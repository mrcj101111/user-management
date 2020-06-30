import axios from 'axios';

export const GET_USERS_BEGIN = 'GET_USERS_BEGIN';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const IS_MODAL_OPEN = 'IS_MODAL_OPEN';
export const UPDATE_ACTIVE_USER = 'UPDATE_ACTIVE_USER';

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

export const isModalOpen = () => ({
    type: IS_MODAL_OPEN,
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

export const toggleModal = (activeUser) => {
    const activeUserObject = { };

    //Take data from json object and flatten in order for simple implementation in components.
    Object.entries(activeUser).map(([key, value]) => {
        if (typeof value === "object") {
            Object.entries(value).map(([key, value]) => {
                if (typeof value === "object") {
                    Object.entries(value).map(([key, item]) => {
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
