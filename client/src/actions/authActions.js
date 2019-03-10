import { FETCH_USER } from './Types';
import axios from 'axios';

export const verifyUser = () => async dispatch => {
    const a = localStorage.getItem("token")
    const res = await axios.get("https://wams.herokuapp.com/users/login",{
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    });

    
    
    dispatch({type: FETCH_USER, payload: res.data })
}


export const signinUser = (email,password) => async dispatch => {
    const data = {
        email,
        password
    }
    const res = await axios.post('https://wams.herokuapp.com/users/login',data);
    console.log(res.data.resData.userData.token)
    localStorage.setItem('token', res.data.resData.userData.token);
    dispatch({type: FETCH_USER, payload: res.data })
}