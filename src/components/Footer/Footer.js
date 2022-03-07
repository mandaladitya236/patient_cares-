import React from "react";
import "./Footer.css";
import {Row, Col} from "react-bootstrap"



const Footer = () =>
    <footer className="footer navbar-staticBottom">
        <Row>
            <Col lg={12}>
            <p className="footerText">PATIENT CARE SYSTEM BY ADITYA MANDAL</p>
        </Col>
      </Row>
    </footer>;
export default Footer;
