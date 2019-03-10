import React,{ Component } from 'react';
import { 
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardBody, 
    MDBInput,
    MDBIcon,
   
} from 'mdbreact';
class Step2 extends Component{
    render(){
        return(
            <MDBCardBody>
                    <MDBRow>
                        <MDBCol style = {{textAlign:"center"}}><h3>step 2</h3></MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput
                                placeHolder = "Mobile No *"
                                type = "Number"
                                validate
                                name = "mobileno"
                                onChange = {this.props.handleInput}
                                
                            />
                            
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol>
                            <MDBInput 
                                placeHolder= "address line 1 *"
                                name = "aline1"
                                onChange = {this.props.handleInput}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput 
                                placeHolder= "address line 2 "
                                name = "aline2"
                                onChange = {this.props.handleInput}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput 
                                placeHolder= "city"
                                name = "city"
                                onChange = {this.props.handleInput}                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput 
                                placeHolder= "State"
                                name = "state"
                                onChange = {this.props.handleInput}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBInput 
                                placeHolder= "Pincode "
                                type = "Number"
                                validate
                                name = "pincode"
                                
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol style={{display:"flex",alignItems:"center"}}>
                        <MDBIcon icon="circle" inverse />
                        <MDBIcon icon="circle"  />
                        <MDBIcon icon="circle" inverse />
                    </MDBCol>
                    <MDBCol style = {{display:"flex", justifyContent:"flex-end"}}>        
                        <MDBBtn color="primary" size = "sm" onClick = {()=>{}}>
                            Submit
                        </MDBBtn>

                    </MDBCol>
                    
                </MDBRow>

                </MDBCardBody>
        )
    }

}

export default Step2