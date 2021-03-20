import constants from "./const"


export function changeData(landId){
    return{
        type: constants.CHANGE_LANG_ID,
        value: landId
    }
}