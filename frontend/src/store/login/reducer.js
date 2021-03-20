let initState = {
    email: '',
    password: ''
}

export default function loginReducer(state = initState, action) { 
    switch(action.type){
        case "enterEmail":return{
            ...state,
            email: action.value
        }
        case "enterPassword":return{
            ...state,
            password: action.value
        }
    }
    return state
}