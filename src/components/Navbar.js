import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from "react-intl";
import logo from '../images/logo.png'

const Navigationbar = () => {
  return (
    <Navbar className="navbar-expand-md py-1" variant="dark" expand="lg" sticky="top">
      <Container>
      <img src={logo} width="45px" height="45x"/>
        <Link to="/" className="navbar-brand">
        <span>&nbsp;</span>Covidst.com <small className="text-muted"> / <FormattedMessage id="nav_text"></FormattedMessage></small>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/" className="nav-link mx-2">
              <FormattedMessage id="home_page" /> 
            </Link> 
            <Link to="/maps" className="nav-link mx-2">
              <FormattedMessage id="map" />
            </Link>
            <Link to='/country/TR' className="nav-link mx-2">
              <FormattedMessage id="country-detail" />
            </Link>
            <Link to="/forecast" className="nav-link mx-2">
               <FormattedMessage id="forecast" />
            </Link>
            <Link to="/about" className="nav-link mx-2">
              <FormattedMessage id="about" />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default memo(Navigationbar);