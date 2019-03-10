import React, {Component} from 'react';
import {MDBInput,MDBBtn} from 'mdbreact';
import axios from 'axios';




class Test extends Component{


    state = {
        selectedFile : null,
        loaded : 0
    }
    submit = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        console.log(data)
    axios
      .post('http://053716dc.ngrok.io/users/save', data)
      .then(res => {
        console.log(res)
      })
    }

    handleChange = (event) => {
        
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
              })
    
    }

    render(){
        return(
            <div>
                <MDBInput
                    type = "File"
                    onChange = {this.handleChange}
                />
                <MDBBtn 
                    onClick = {this.submit}
                >SUbmit</MDBBtn>

                <p>{this.state.loaded}</p>
            </div>
        )
    }
}

export default Test