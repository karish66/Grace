import React from "react";
import CircularProgressbar from 'react-circular-progressbar';
import { MDBContainer,Col,Row } from "mdbreact";

import { connect } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
class Reward extends React.Component {

    render() {
        const percentage = 66;
        return (
        <CircularProgressbar
            percentage={percentage}
            text={`${percentage}%`}
            styles={{
                path: { stroke: `rgba(62, 152, 199, ${percentage / 100})` },
                text: { fill: '#f88', fontSize: '16px' },
              }}

          />
        );
    }
}

export default connect()(Reward);