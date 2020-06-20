import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div>
        <h1>Auth</h1>
        <button className="btn btn-danger" onClick={this.loginClickEvent}><i className="fab fa-google"></i> Log in</button>
      </div>
    );
  }
}

export default Auth;
