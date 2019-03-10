import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import * as actions from '../../../actions/SignupActions';
class Otp extends Component {
    
    state = {
        otp:""
    }

    handleInput = (otp) => {
        this.setState({
            otp
        })
        console.log(this.state.otp)
        if (this.state.otp.length == 6){
            this.props.validateOtp(this.state.otp, this.props.email)
        }
    }
    

    render(){
        
        return(
            <div>
            <OtpInput
                onChange={(otp)=>this.handleInput(otp)}
                numInputs={7}
                separator={"-"}
                containerStyle =""   
          />
          </div>
        )
    }
}



export default connect(null,actions)(Otp);