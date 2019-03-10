
import  {FETCH_SUCCESS } from '../actions/Types'

const init = {

}


export default function(state = init, action){
    const a = Object.assign({},state)
     switch( action.type ){
         case FETCH_SUCCESS:
             if (action.payload){
                 a.DonateStatus =action.payload.ok
             }
             return a;
             default:
             return state
 
         
 }}