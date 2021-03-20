import constants from "./const"

let initState = {
    langId: "1",
}

export default function langReducer(state = initState, action) {
    switch (action.type) {
        case constants.CHANGE_LANG_ID: {
            return {
                ...state,
                langId: action.value
            }
        }
        default: return state;
    } 
}