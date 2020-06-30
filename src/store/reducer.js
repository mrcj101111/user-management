import * as actionTypes from './actions';

const initialState = {
    users: [],
    loading: false,
    error: null,
    activeUserInfo: {},
    isModalOpen: false,
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
        case actionTypes.IS_MODAL_OPEN:
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
                
            }
            case actionTypes.UPDATE_ACTIVE_USER:
                return {
                    ...state,
                    activeUserInfo: action.payload.activeUser,
                }
        default:
            return state;
    }
};

export default reducer;