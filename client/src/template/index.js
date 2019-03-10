import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';

import PrivateLayout from './privateTemplate';
import PublicLayout  from './publicTemplate';

import privateRoutes from '../routes/privateRoute';
import publicRoutes  from '../routes/publicRoute';
import sessionRoutes from '../routes/sessionRoute';

import * as auth from '../actions/authActions';
import Login from '../scenes/sessionScene/Login';
import NotFound from '../scenes/publicScene/NotFound';

class Template extends Component {

    

    componentWillMount() {
        this.props.verifyUser()
    }

    render() {
        
        const user = this.props.user;
        
        // if (!user. loggedin) { return(<div>Loading...</div>); }
        return (
        <BrowserRouter>
            <Switch>
                
                { _.map(publicRoutes, (route, key) => {
                    const { component, path } = route;
                    

                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) => <PublicLayout component={component} route={route} user={user}/>}
                        />
                    )
                }) }

                { _.map(privateRoutes, (route, key) => {
                    const { component, path } = route;
                    
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                                
                                
                                user.auth.loggedin ? (
                                <PrivateLayout component={component} route={route} user={user} />
                                ) : (
                                <PublicLayout component={Login} route={route} user={user}/>
                                )
                            
                            }
                        />
                    )
                }) }

                { _.map(sessionRoutes, (route, key) => {

                    
                    const { component, path } = route;
                   

                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                                user.auth.loggedin ? (
                                    <Redirect to="/dashboard"/>
                                ) : (
                                    <PublicLayout component={component} route={route} user={user}/>
                                )
                            }
                        />
                    )
                }) }

             <Route component = {NotFound} />
            </Switch>
        </BrowserRouter>
        );
    }
}

function mapStateToProps(state, props) { return { user: state } }


export default connect(
    mapStateToProps,
    auth
)(Template);