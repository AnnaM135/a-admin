let initState = {
    user: {}
}

export default function profileReducer(state = initState, action) { 
    switch(action.type){
        case "changeData":return{
            user: action.value
        }
        case "logout":return{
            user: {}
        }
    }
    return state
}