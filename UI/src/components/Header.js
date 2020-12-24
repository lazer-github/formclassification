import React, { useState } from "react";
import cx from 'classnames';
import { Nav, Navbar } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

const menus = [
  { title: 'Home', url: '/' },
  { title: 'Contributors', url: '/contributors' },
  { title: 'About', url: '/about' },
];
const Header = (props) => {
  const { location: { pathname } } = props;
  const [pathName, setPathName] = useState(pathname);
  const navigationHandler = (e, url) => {
    e.preventDefault();
    setPathName(url);
    props.history.push(url);
  };
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Form Classification</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {menus && menus.map((item, i) => {
            const { title, url } = item;
            const classes = cx({ 'active-menu': pathName === url });
            return (
              <Nav.Link
                className={classes}
                eventKey={i}
                href={url}
                onClick={(e) => navigationHandler(e, url)}
              >
                {title}
              </Nav.Link>
            )
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Header);
