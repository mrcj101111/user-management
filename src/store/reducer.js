import * as actionTypes from './actions';

const initialState = {
    users: [],
    loading: false,
    error: null,
    activeUserInfo: {},
    isViewModalOpen: false,
    isEditModalOpen: false,
    formErrors: {},
    filteredUsers: [],
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
                filteredUsers: action.payload.users,
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
                filteredUsers: state.filteredUsers.filter(person => person.id !== action.payload.id)
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
                formErrors: (state.formErrors && state.formErrors.length > 0) ? state.formErrors : state.formErrors = {}
            }
        case actionTypes.UPDATE_ACTIVE_USER:
            return {
                ...state,
                activeUserInfo: action.payload.activeUser,
            }
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                filteredUsers: state.filteredUsers.map(person => {
                    return person.id === action.payload.updatedUser.id ? { ...person, ...action.payload.updatedUser } : person
                })
            }
        case actionTypes.SEARCH_USERS:
            return {
                ...state,
                filteredUsers: state.users.filter(value =>
                    (value.name && value.name.toLowerCase().includes(action.payload.data)) ||
                    (value.username && value.username.toLowerCase().includes(action.payload.data)) ||
                    (value.email && value.email.toLowerCase().includes(action.payload.data)) ||
                    (value.company.name && value.company.name.toLowerCase().includes(action.payload.data))
                )
            }
        case actionTypes.ADD_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload.error
            }
        default:
            return state;
    }
};

export default reducer;
