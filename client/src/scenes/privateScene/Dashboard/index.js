import React, { Component} from 'react';
import AccepterDashboard from './AcceptorDashboard';
import DonorDashboard from './DonorDashboard';
import EacDashboard from './EacDashboard';
import { connect } from 'react-redux';
import style from './Dashboard.css'
import * as actions from '../../../actions/dashboardActions'


class Dashboard extends Component {

    componentWillMount() {
        this.props.fetch_dashboard()
        
    }

    renderContent = () => {
        switch(this.props.dashboard.accountType){
            case null:
                return <p>loading....</p>
            case "AC":
                return <AccepterDashboard />

            case "DO":
                return <DonorDashboard />

            case "EAC":
                return <EacDashboard/>
            default:
                return 
        }
    }

    render(){
       
        return(
            <div>
            {this.renderContent()}

            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        dashboard : state.dashboard,
        
    }
}


export default connect(mapStateToProps,actions)(Dashboard)


