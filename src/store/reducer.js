import * as actionTypes from './actions';

const initialState = {
    users: [],
    loading: false,
    error: null,
    activeUserInfo: {},
    isViewModalOpen: false,
    isEditModalOpen: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                loading: false,
            }
        case actionTypes.GET_USERS_FAILURE:
            return {
                ...state,
                users: [],
                loading: false,
                error: action.payload.error
            };
        case actionTypes.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(person => person.id !== action.payload.id)
            }
        case actionTypes.IS_VIEW_MODAL_OPEN:
            return {
                ...state,
                isViewModalOpen: !state.isViewModalOpen,
            }
        case actionTypes.IS_EDIT_MODAL_OPEN:
            return {
                ...state,
                isEditModalOpen: !state.isEditModalOpen,
            }
        case actionTypes.UPDATE_ACTIVE_USER:
            return {
                ...state,
                activeUserInfo: action.payload.activeUser,
            }
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(person => {
                    return person.id === action.payload.updatedUser.id ? { ...person, ...action.payload.updatedUser } : person
                })
            }
        default:
            return state;
    }
};

export default reducer;