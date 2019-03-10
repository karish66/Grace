import React,{ Component } from 'react';
import { 
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardBody, 
    MDBInput,
    MDBIcon,
    MDBFormInline
} from 'mdbreact';
import {connect} from 'react-redux';
import * as actions from '../../../actions/SignupActions'
import Otp from './Otp';


class Step1 extends Component{


    state = {
        emailStatus : false,
        loading : true
    }

    handleInput = (e) => {
        this.props.handleInput(e)
    }
    handleClick = (nr) => {
        this.props.handleClick(nr)
    }
    handleSendOtp =() => {
        
        this.props.SendOtp(this.props.email)

        
    }

    renderContent = () => {
        
        if (!this.props.signup.a){
            return (
                <div
                    onClick={this.handleSendOtp}
                >
                    <MDBIcon far icon="question-circle" />
                </div>
            )
        }
        else {
            return (
                <Otp email = {this.props.email}/>  
            )
        }
    }


    render(){
        return(
            <MDBCardBody>
                <MDBRow>
                    <MDBCol style = {{textAlign:"center"}}><h3>step1</h3></MDBCol>   
                </MDBRow>
                <MDBRow>
                    <MDBCol sm={7}>
                        <MDBInput
                            placeHolder= "email"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                            onChange = {this.props.handleInput}
                            name = "email"
                        />
                    </MDBCol>
                    <MDBCol sm={5} style={{display:"flex",alignItems:"center"}}>   
                        {this.renderContent()}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput
                            placeHolder = "first name"
                            onChange = {this.handleInput}
                            name = "firstName"
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            placeHolder="last name"  
                            onChange = {this.handleInput}
                            name = "lastName"  
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                    <MDBFormInline>
                    <MDBInput onClick={this.handleClick(1)} checked={this.props.type===1 ? true : false} label="donor"
                       type="radio" id="radio1" name = "type"/>
                    <MDBInput onClick={this.handleClick(2)} checked={this.props.type===2 ? true : false} label="Accepter"
                       type="radio" id="radio2" name = "type"/>
                  </MDBFormInline>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBInput 
                            placeHolder = "Password"
                            type= "Password"
                            validate
                            onChange = {this.handleInput}
                            name = "password"
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol style={{display:"flex",alignItems:"center"}}>
                        <MDBIcon icon="circle"  />
                        <MDBIcon icon="circle" inverse />
                        <MDBIcon icon="circle" inverse />
                    </MDBCol>
                    <MDBCol style = {{display:"flex", justifyContent:"flex-end"}}>        
                        <MDBBtn color="primary" size = "sm" onClick={this.props.onNext}>
                            NEXT<MDBIcon icon="right" className="mr-1" pull="right"/> 
                        </MDBBtn>

                    </MDBCol>
                    
                </MDBRow>
                
              </MDBCardBody>   
                
        )
    }

}

function mapStateToProps({signup}){
    return {signup}
}

export default connect(mapStateToProps,actions)(Step1)