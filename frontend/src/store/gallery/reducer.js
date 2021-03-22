let globalState = {
    gallery: [],
    addProject: {
        name: "",
       photo_url: "",
    },
}

export default function myTasksReducer(state = globalState, action){
    switch(action.type){
        case "show": return {
            ...state,
            gallery: action.value
        }
        case "delete": return{
            ...state,
            gallery: action.value
        }
        case "update": return{
            ...state,
            gallery: action.value
        }
        case "addName": return {
            ...state,
            name: action.value
        }
        case "addPhoto": return {
            ...state,
            photo_url: action.value
        }

    }
    return state
}