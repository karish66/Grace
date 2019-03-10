import axios from 'axios'
import { FETCH_SUCCESS} from './Types'
export const fetch_dashboard = () => async dispatch => {

    const res = await axios.get('https://wams.herokuapp.com/users/dashboard',{
        headers:{
            
            "Authorization": localStorage.getItem("token")
        }
    
    });
    console.log(res.data)
    dispatch({type:FETCH_SUCCESS,payload:res.data})
    
}