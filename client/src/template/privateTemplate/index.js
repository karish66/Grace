import React,{ Component } from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import { Link } from 'react-router-dom';

class PrivateLayout extends Component {
    render(){
        const Component = this.props.component;
        const route = this.props.route;
        const user = this.props.user;
       
        return (
            <div>
                <div>
                    <Header  type="privateLayout"/>
                </div>

                <Component route={route}/>
                <div>
                    <Footer/>
                </div>
            </div>
                
        )
    }
}


export default PrivateLayout


// const Component = this.props.component;
// const route = this.props.route; 
// const user = this.props.user;
// return (
//     <div>
//         <Header
//             type = "privateLayout"
//             userState = "true"
//             routes = {route}
//         />
//         <div>
//            <Component route = { route } /> 
//         </div>
//     </div>