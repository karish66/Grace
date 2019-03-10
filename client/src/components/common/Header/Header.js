import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as auth from '../../../actions/authActions'
import { Navbar,
    NavbarBrand,
    NavbarNav,
    NavItem, 
    NavLink, 
    NavbarToggler, 
    Collapse,    
    Fa,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
     
 } from "mdbreact";

 import {Redirect} from 'react-router-dom'
import styles from './Header.css'
class Header extends Component {

    state = {
        isOpen: false
      };

      logout=()=>{
        localStorage.removeItem("token")
        return(
          
          <Redirect to="/sigin" />

        )
      }
      
    
    toggleCollapse = this.setState({ isOpen: !this.state.isOpen });
    
    renderHeader = (type,routes,user) => {
        if( type === "publicTemplate"){
            return (
             <Navbar color="special-color"  expand="md" style = {{marginBottom:"0px"}}>
                <NavbarBrand>
                    <strong className="white-text">Grace</strong>
                </NavbarBrand>
                <NavbarToggler
                onClick={this.toggleCollapse}
                />
                <Collapse   id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <NavbarNav left >
                    <NavItem >
                    <NavLink to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink to="/about-us">About us</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink to="/contact">Contact</NavLink>
                    </NavItem>
                    
                </NavbarNav>
                <NavbarNav right>
                    
                    <NavItem>
                    <NavLink className="waves-effect waves-light" to="#!"><Fa icon="google-plus" /></NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink to="/signin">Signin</NavLink>
                    </NavItem>
                </NavbarNav>
                </Collapse>
            </Navbar>
            )
        }
        return (
            <Navbar color="info-color" dark expand="md" style={{}}>
            <NavbarBrand>
              <NavLink to="/dashboard">
              <strong className="white-text">Grace</strong>
              </NavLink>
              
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleCollapse} />
            <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
              <NavbarNav right>
                <NavItem>
                  <NavLink className="waves-effect waves-light" to="/dashboard/logs"><Fa icon="envelope" className="mr-1" />Logs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="waves-effect waves-light" to="#!"><Fa icon="gear" className="mr-1" />Settings</NavLink>
                </NavItem>
                <NavItem>
                  <Dropdown>
                    <DropdownToggle nav caret>
                      <Fa icon="user" className="mr-1" />Profile
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-default" right>
                      <DropdownItem href="#!">My account</DropdownItem>
                      <p onClick={this.logout}>log out</p>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </NavbarNav>
            </Collapse>
          </Navbar>
        )
    }

    render(){
        const type = this.props.type
        const routes = this.props.routes
        const user = this.props.user
        return(
            <div>
               {this.renderHeader(type,routes,user)}
            </div>
        )
    }
}


export default connect(null,auth)(Header)