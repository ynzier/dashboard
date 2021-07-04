/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCog,
  faEnvelopeOpen,
  faSearch,
  faSignOutAlt,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import {
  faUserCircle,
  faCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  Row,
  Col,
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
  Button,
  ListGroup,
} from '@themesberg/react-bootstrap';

import NOTIFICATIONS_DATA from '../data/notifications';
import Profile3 from '../assets/img/team/icon.png';
import AuthService from '../services/auth.service';

export default props => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const logOut = () => {
    AuthService.logout();
  };

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }, 300);
  };

  const Notification = props => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? '' : 'text-danger';

    return (
      <ListGroup.Item action href={link} className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image
              src={image}
              className="user-avatar lg-avatar rounded-circle"
            />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center"></div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    src={Profile3}
                    className="user-avatar md-avatar rounded-circle"
                  />
                  &nbsp;&nbsp;
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <Button>
                      <span
                        className="mb-0 font-small fw-bold"
                        style={{ color: 'white' }}>
                        KLHealthcare
                      </span>
                    </Button>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" href="https://warranty.klhealthcare.net">
                  <FontAwesomeIcon icon={faCheckSquare} className="me-2" />
                  เว็บเช็คประกัน
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item
                  className="fw-bold"
                  onClick={() => {
                    logOut();
                    window.location = '/';
                  }}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-danger me-2"
                  />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
