import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from "react-intl";

const Navigationbar = () => {
  return (
    <Navbar variant="dark" expand="lg" sticky="top">
      <Container>
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon icon={faChartLine}/> <span>&nbsp;</span> Covid Stats
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