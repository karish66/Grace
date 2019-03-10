import React ,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/SignupActions';
import './Signup.css';
import axios from 'axios';
import { 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,  
} from 'mdbreact';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

class Signup extends Component {

    state = {
        user: {
            accountType:1,
            email:'',
            firstName : '',
            lastName : '',
            age:0,
            addressLine1:"",
            addressLine2:"",
            lat:0,
            long:0,
            password:"",
            contactNo:0,
            city:"",
            pinCode:0


        },
        type :1,
        step:1,
        submitted : false,
        emailStatus : false,
    }

    onClick = nr => () =>{
        this.setState({
          type: nr
        });
      }
    
    

    onHandleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        
        console.log(this.state.user)
      
    }

    onNext = () => {
        this.setState({
            step:this.state.step+1
        })
    }

    renderContent = () => {
        switch (this.state.step){
            case 1:
                return (
                    <Step1
                        handleInput = {this.onHandleChange}
                        handleClick = {this.onClick}
                        type = {this.state.type}
                        onNext = {this.onNext}
                        emailStatus = {false}
                        email = {this.state.user.email}
                    />
                )
                break;
            case 2:
                return(
                    <Step2
                        handleInput = {this.onHandleChange}
                        onNext = {this.onNext}
                        
                    />
                )
                break;

            case 3:
                return(
                    <Step3
                        handleInput = {this.onHandleChange}
                    />   
                )
                break;
            default:
                return (
                    <div>
                    
                    </div>
                )
        }
    }


    render(){
        return(
    <div>
        <MDBContainer fluid className = "bg">
            <MDBRow style={{paddingTop:"0px"}}>
                <MDBCol></MDBCol>
                <MDBCol></MDBCol>
                <MDBCol style={{ maxWidth: "35rem"}}>
                    <MDBCard className = "bgColor" style={{marginTop:"1.3rem", marginRight:'2.5rem',borderRadius:"5px"}}>
                        {this.renderContent()}
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </div>
        )
    }
}

export default connect()(Signup)

