import {SHOW_MESSAGE} from "./constants";

const initialState = {
    error_message: null
};

const reducer = (state = initialState, action) => {
    if (action.type === SHOW_MESSAGE) {
        return (
            {
                ...state,
                error_message: action.error_message
            });
    } else {
        return state;
    }
};

export default reducer;