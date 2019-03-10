import React, {Component} from 'react';
import { Col, Container, Row, Button, Fa } from 'mdbreact'
import { MDBCard, MDBBody } from 'mdbreact';
import { Card } from '../../../components/card/Card'
import * as actions from '../../../actions/authActions'
import DonateModel from './DonateDashboard/DonateModel'
import Map from './DonateDashboard/map'
import Reward from './DonateDashboard/Reward';
import List from './DonateDashboard/list'
import { connect } from 'react-redux';
import openSocket from "socket.io-client";

class DonorDashboard extends Component {

  state = {
    message:"",
    status : 0,
    otp:""
  }
    componentDidMount(){

      // this.props.fetch_success()
      const a = localStorage.getItem("token")
      
      const socket = openSocket("https://wams.herokuapp.com/",{origins:"*:*",query:`token=${a}`});
      // socket.set('origins','*:*')
      socket.on("connect",()=>{
        
        console.log("connected")
      })
     
      socket.on("create",(message)=>{
        console.log(message)
        this.setState({
          status:1,
          message:"active request",
          
        })
      })
      
      socket.on("destroy",message=>{
        console.log(message)
        this.setState({
          status:0
        })
      })

    

    socket.on("accept",message=>{
      console.log(message)
      this.setState({
        status:1,
        message:"request accepted"
        ,otp:message.otp
      })
    })

  }

  
    renderContent = () => {
      
      if (this.state.status === 0){
        return (
          <div>
          
          <DonateModel pos = {this.props.dashboard.location} />

    
          </div> 
        )
        
      }
      return (
        <div>
    <p>{this.state.message}</p>
    <p>{this.state.otp}</p>

    </div>
          
        
      )
    }
    render(){
      console.log(this.props.dashboard)
      
      
        return(
          <Container>
            <Row style={{paddingTop:"20px"}}>
              <Col sm ={4}>
              <MDBCard style={{height:"200px",display:"flex",justifyContent:"center",alignItems:"center",width:"200px"}}>
                  {this.renderContent()}
              </MDBCard>
              </Col>
              <Col sm ={8}>
              <MDBCard style={{height:"200px",padding:"5rem"}}>
              
             </MDBCard>
              </Col>
            
            </Row>

            <Row  style={{paddingTop:"30px"}}>
            <Col sm={6}>
            <MDBCard style={{height:"200px"}}>
            
            <Map/>
          
             </MDBCard>
             </Col>
              
              <Col sm = {6}>
              <MDBCard style={{padding:"20px"}}>
              <List data={this.props.dashboard.last}/>
              </MDBCard>
                
              </Col>
            </Row>
          
          </Container>
            
        )
    }
}

function mapStateToProps(state){ 
  return {
    dashboard:state.dashboard,
    request:state.request
  }
}

export default connect(mapStateToProps,actions)(DonorDashboard)

