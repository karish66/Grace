import React,{ Component } from 'react';
import { 
    
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardBody,
    MDBInput 
   
} from 'mdbreact';
class Step3 extends Component{
    render(){
        return(
            <MDBCardBody>
                            <MDBRow>
                                <MDBCol style = {{textAlign:"center"}}><h3>Final Step</h3></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput
                                        type = "File"
                                        
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput
                                        type = "File"
                                        
                                    />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol>
                                    <MDBBtn color="primary">SUBMIT</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
        )
    }

}

export default Step3