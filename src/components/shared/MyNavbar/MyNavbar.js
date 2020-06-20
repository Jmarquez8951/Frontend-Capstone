import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    return (
      <div className="MyNavbar">
        <h1>My Navbar</h1>
        {
          authed
            ? <button className="btn btn-danger" onClick={this.logMeOut}>Logout</button>
            : ''
        }
      </div>
    );
  }
}

export default MyNavbar;
