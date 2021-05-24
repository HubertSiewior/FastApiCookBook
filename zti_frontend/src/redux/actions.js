import {SHOW_MESSAGE} from "./constants";

export const showErrorPopup = (error_message) => {
    return{
            type: SHOW_MESSAGE,
            error_message: error_message
        }
}