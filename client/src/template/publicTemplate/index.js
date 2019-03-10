import React,{ Component } from 'react';
import Header from '../../components/common/Header/Header';
class PublicLayout extends Component {
    render(){
        const Component = this.props.component;
        console.log(Component)
        const route = this.props.route; 
        const user = this.props.user;
        return (
            <div>
            <div>
                <Header
                    type = "publicTemplate"
                    userState = "true"
                    routes = {route}
                />
                </div>
            <div>
                <Component route={route}/>
                </div>
            </div>
        )
    }
}


export default PublicLayout

