import  {VERIFY_EMAIL } from '../actions/Types'


export default function(state = null, action){
    switch( action.type ){
        case VERIFY_EMAIL:
            return {a :true};
        default:
            return {a:false}
    }
}