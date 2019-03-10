import React,{Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import _ from "lodash"
class List extends Component {
  render(){
  console.log(this.props.dashboard)

    return (
      <MDBTable hover small>
        <MDBTableHead>

        
          <tr>
            <th>amount</th>
            <th>type</th>
            <th>status</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {_.map(this.props.data,(id,key)=>{
          let type=""
          if (id.typeOfDonation ==="C"){
            type = "Cloth"
          }
          else{
            type = "Food"
          }
          return(
            <tr>
            <td>{id.amountOfDonation}</td>
            <td>{type}</td>
            <td>{id.status}</td>
          </tr>
          )
        })}
          
         
          
          
        </MDBTableBody>
      </MDBTable>
    );
  }
  
}


export default (List);