import  { DONATE_REQUEST,ACCEPT_REQUEST } from '../actions/Types'

const initState={
    DonateStatus:0,
    AcceptStatus:0
}

export default function(state = initState, action){
   const a = Object.assign({},state)
    switch( action.type ){
        case DONATE_REQUEST:
            if (action.payload){
                a.DonateStatus =action.payload.ok
            }
            return a;

        case ACCEPT_REQUEST:
            return action.payload
        default:
            return state
    }
}