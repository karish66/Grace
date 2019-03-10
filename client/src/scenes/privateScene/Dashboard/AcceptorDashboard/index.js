import React,{Component} from 'react';
import openSocket from "socket.io-client";
import {MDBCard,Container,Row,Col,MDBCardBody,MDBCardTitle,MDBCardText,
    MDBBtn,MBDInput

} from 'mdbreact';

import _ from 'lodash'
import * as action from '../../../../actions/dashboardActions'
import {connect } from 'react-redux'
class AcceptorDashboard extends Component{

    state = {
        connection:{},
        accepted:false,
        otp:""
        
    }

    

    accept_request = (id) => () => {
        this.props.accept_request(id)
    }

    componentDidMount(){
      
      
      const a = localStorage.getItem("token")
      const socket = openSocket("https://wams.herokuapp.com/",{origins:"*:*",query:`token=${a}`});
      // socket.set('origins','*:*')
      socket.on("connect",()=>{
        console.log("connections")
        
      })
      socket.on("create",message=>{
        
        const connection  = Object.assign({}, this.state.connection);
        connection[message.id] = message 
        const id = message.id 
        this.setState({
            connection
        })
        console.log(this.state)
      })
      
      socket.on("destroy",message=>{

        let connection  = Object.assign({}, this.state.connection);
        connection = _.omit(connection,message.id)
        console.log(connection)
        this.setState({
            connection
        })
        
       
      })

      socket.on("accept",message=>{
        console.log(message)
        this.setState({
            accepted:true
        })
       
      })
    }

    renderBtn = (a) =>{
        if (!this.state.accepted){
            return (
                <MDBBtn  color="warning" onClick={this.accept_request(a)} >Accept it</MDBBtn>
            )
        }
       return(
           <div>
           <MBDInput label="otp"/>
        <MDBBtn  color="success" onClick={()=>{}} >Otp</MDBBtn>
           </div>
           
       )
    }

    render(){
        return (
            <Container style={{}}>

            <Row style={{marginTop:"30px"}}>
                <Col><h3><u>Successfully Accepted Request</u></h3></Col>    
            </Row>
            <Row>
                
            </Row>


                <Row>
                
                {_.map(this.state.connection,(id,key)=>{
                    const a = id.id
                    return (
    <Col sm={3}>
    <MDBCard >
        <MDBCardBody>
            
            <MDBCardTitle>
            Active request
        </MDBCardTitle>
            
            
            <MDBCardText>
                <p>email: {id.email}</p>
                <p>amount: {id.amountOfDonation}</p>
                <p>catagory: {id.typeOfDonation}</p>
            </MDBCardText>

            {this.renderBtn(a)}
        </MDBCardBody>
        
    </MDBCard>
    </Col>
)
                })}
           
                </Row>

                
            </Container>

            

            
        )
    
    }
}

function mapStateToProps(state){
    return {
        accept:state.accept
    }
}

export default connect(null,action)(AcceptorDashboard);


