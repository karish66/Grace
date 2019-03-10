import { VERIFY_EMAIL_OTP, VERIFY_EMAIL} from './Types';
import axios from 'axios';

export const SendOtp = (email) => async dispatch => {
    const res = await axios.post('https://wams.herokuapp.com/users/verify/send-otp',{email})
    console.log(res.data)
    dispatch ({type:VERIFY_EMAIL,payload:true})
}


export const validateOtp = (otp, email) => async dispatch => {
    const data = {
        otp:otp,
        email:email
    }
    const res = await axios.post('https://wams.herokuapp.com/users/verify/validate-otp',data);
    console.log(res)
    dispatch({type: VERIFY_EMAIL_OTP, payload: res.data })
}

