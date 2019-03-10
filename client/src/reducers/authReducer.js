import  {FETCH_USER } from '../actions/Types'

const userDefault = {
    name: "",
    detail:{},
    loggedin : false,
    verified: false,
    token:"" ,
    acountType:null
}

export default function(state = userDefault, action){
    const user = Object.assign({}, state);
    switch( action.type ){

        case FETCH_USER:
            if (action.payload){
                user.name = action.payload.resData.userData.name
                user.loggedin = action.payload.resData.userData.isMatched
                user.token = action.payload.resData.userData.token
                user.accountType = action.payload.resData.userData.accountType
                
            }
            
            return user

        
        default:
            return user
    }
}

