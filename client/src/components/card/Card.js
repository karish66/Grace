import React from 'react';
import { MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const Card = () => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        
        {this.props.children}
      </MDBCard>
    </MDBCol>
  )
}

export default Card;