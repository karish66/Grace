import axios from 'axios'
import { FETCH_DASHBOARD,DONATE_REQUEST,ACCEPT_REQUEST} from './Types'
export const fetch_dashboard = () => async dispatch => {

    const res = await axios.get('https://wams.herokuapp.com/users/dashboard',{
        headers:{
            
            "Authorization": localStorage.getItem("token")
        }
    
    });
    console.log(res.data)
    dispatch({type:FETCH_DASHBOARD,payload:res.data})
    
}

export const donate_request = (cat,amount,dis,lat, long) => async dispatch =>{
    const data = {
        typeOfDonation:cat,
        amountOfDonation:amount,
        description:dis,
        lat:lat,
        long:long
    }
    console.log(data)
    var headers = {
        'Content-Type': 'application/json',
        'Authorization':  localStorage.getItem("token")
    }
    
    const res = await axios.post('https://wams.herokuapp.com/request/create',
        data,
        {headers:headers}
    )

    console.log(res.data)

    dispatch({type:DONATE_REQUEST,payload:res.data})
}


export const accept_request = (id) => async dispatch =>{
    console.log(id)
    var headers = {
        'Content-Type': 'application/json',
        'Authorization':  localStorage.getItem("token")
    }
    
    const res = await axios.post('https://wams.herokuapp.com/request/accept',
        {id},
        {headers:headers}
    )

    
    console.log(res.data)
    dispatch({type:ACCEPT_REQUEST,payload:res.data})
}