import  { FETCH_DASHBOARD, DONATE_REQUEST } from '../actions/Types'

const Ddashboard = {
    accountType:"",
    location :{},
    last:{}
}
export default function(state = Ddashboard, action){
    const dashboard = Object.assign({}, state);
    switch( action.type ){
        case FETCH_DASHBOARD:

        if (action.payload){
            dashboard.accountType = action.payload.resData.userData.accountType
            dashboard.location = action.payload.resData.userData.location || false 
            dashboard.last = action.payload.resData.donationData

            
        }
        
        return dashboard
            

        
        default:
            return state
    }
}