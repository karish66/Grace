import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBContainer, 
  MDBBtn, 
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader, 
  MDBModalFooter,
  Input,
  Row,
  Col,
  MDBFormInline,
  MDBIcon
} from 'mdbreact';
import * as actions from '../../../../actions/dashboardActions'



class ModalPage extends Component {
state = {
  modal14: false,
  v:0,
  cat:'food',
  des:""
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

donate_request = () => {
  this.props.donate_request(this.state.cat,this.state.v,this.state.des,this.props.pos.coordinates[0],this.props.pos.coordinates[1])
  
}

onClick = (cat) => ()=> {
  this.setState({
    cat:cat
  })
}

render() {
  
  return (
      <MDBContainer>
        <div onClick={this.toggle(14)}>
        <MDBIcon icon="plus-circle" size="5x"/>
        </div>        
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered fade ={false}>
          <MDBModalHeader toggle={this.toggle(14)}>Create Request</MDBModalHeader>
          <MDBModalBody>
          <Row>
            <Col>
            <label style={{padding:"0px"}}>Catagory</label>
            <MDBFormInline>
            <Input gap onClick={this.onClick("F")} checked={this.state.cat==="F" ? true : false} label="Food" type="radio" id="radio1" />
            <Input gap onClick={this.onClick("C")} checked={this.state.cat==="C" ? true : false} label="Cloths" type="radio" id="radio2" />
            <Input gap onClick={this.onClick("E")} checked={this.state.cat==="E" ? true : false} label="E-waste" type="radio" id="radio2" />

          </MDBFormInline>
            </Col>
          </Row>
          <Row>
            <Col sm = {8}>
            <input 
              type="range" 
              className="custom-range" 
              id="customRange1" 
              min = {5} 
              max= {30}
              onChange = {(e)=>this.setState({v:e.target.value})}
              value = {this.state.v}

              />
            </Col>
            <Col sm = {4}>
              <p>{this.state.v} kg</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input 
                type="textarea"
                placeHolder = "Discription"
                onchange = {(e)=>{this.setState({des:e.target.value})}}
              />
            </Col>
          </Row>
           
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
            <MDBBtn 
              color="primary"
              onClick = {this.donate_request}
            
            >Donate</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default connect(null,actions)(ModalPage);