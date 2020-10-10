import React from 'react';

import { NavLink as RRNavlink } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed } = this.props;

      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavlink} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavlink} to='/profile'>Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavlink} to='/chats'>Chats</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavlink} to='/my-games'>My Games</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavlink} to='/games'>Games</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="btn btn-danger" onClick={this.logMeOut}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div className="MyNavbar">
        <Navbar className="navbar-color" light expand="md">
        <NavbarBrand href="/"><img className="logo" src="https://i.imgur.com/BBGvMxI.png" alt="Logo"/></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {buildNavbar()}
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
