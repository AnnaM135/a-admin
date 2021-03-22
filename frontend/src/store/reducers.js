import loginReducer from './login/reducer'
import profileReducer from './profile/reducer'
import {combineReducers} from 'redux'
import langReducer from "./languages/reducer"
import galleryReducer from "./gallery/reducer"


export default combineReducers({ 
    loginReducer,
    langReducer,
    profileReducer,
    galleryReducer
})

