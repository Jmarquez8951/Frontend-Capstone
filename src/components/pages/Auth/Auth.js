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
      <div className="Auth">
        <img src="https://i.imgur.com/BBGvMxI.png" alt="Logo"/>
        <p>Hello welcome to GameSafe. This website was created with the sole purpose
          of helping out fellow game enthusiast to keep track of all their games from
          PC to Xbox and various other systems.
        </p>
        <button className="btn btn-danger" onClick={this.loginClickEvent}><i className="fab fa-google-plus-g"></i> Log on</button>
      </div>
    );
  }
}

export default Auth;
