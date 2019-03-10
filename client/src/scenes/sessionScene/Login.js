import React ,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/authActions';

import {Link} from 'react-router-dom';
import { 
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard, 
    MDBCardBody,
    MDBInput,
    MDBBtn
} from 'mdbreact';

class Login extends Component {

    state = {
        email : "",
        password:""
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name.value)
        this.setState({
            [name] : value
        })
    }

    handleSubmit = () => {
        console.log(this.state.email,this.state.password)
        this.props.signinUser(this.state.email,this.state.password)
    }


render(){
    return(
        <div>
            <MDBContainer fluid className = "bg">
                <MDBRow style={{paddingTop:"0px"}}>
                    <MDBCol sm ={8} style = {{paddingTop:"5rem"}}>
                        <h1 style = {{fontSize : "100px"}}>
                            <b>Contribute to New India</b>
                        </h1>
                    </MDBCol>
                    
                    <MDBCol sm = {4}style={{ maxWidth: "35rem"}}>
                        <MDBCard className = "bgColor" style={{marginTop:"4rem", marginRight:'2.5rem',borderRadius:"5px"}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol>
                                        <h4 className = "text-center">Sign in</h4>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput
                                            type = "email"
                                            placeHolder = "Email"
                                            onChange = {this.handleChange}
                                            name = "email"
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput
                                            type = "password"
                                            placeHolder = "Password"
                                            onChange = {this.handleChange}
                                            name = "password"
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol style={{display:"flex",alignItems:"center"}}>
                                        <Link to="/signup" >Sign up here??</Link>
                                    </MDBCol>
                                    <MDBCol style = {{display:"flex",justifyContent:"flex-end"}}>
                                        <MDBBtn 
                                            color = "primary"
                                            onClick = {this.handleSubmit}
                                        >
                                            Signin
                                        </MDBBtn>
                                    </MDBCol>

                                </MDBRow>

                                
                        
                            </MDBCardBody>  
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}
}

// function mapStateToProps(state, props) { return { user: state } }

export default connect(null,actions)(Login)

