import React from "react";
  import { Col, Container, Row, Footer } from "mdbreact";

  class FooterLayout extends React.Component {
    render() {
    return (
  <Footer color="white" className="font-small pt-0">
      
      <div className="footer-copyright text-center py-3">
        <Container fluid style={{fontColor:"black"}}>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.Grace.com"> www.grace.com </a>
        </Container>
      </div>
    </Footer>
    );
  }
}

export default FooterLayout;