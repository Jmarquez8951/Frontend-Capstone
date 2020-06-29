import React from 'react';
import './Profile.scss';

import usersData from '../../../helpers/data/usersData';
import authData from '../../../helpers/data/authData';

class Profile extends React.Component {
  state = {
    user: {},
  }

  getTheUser = () => {
    usersData.getUserInformation(authData.getUid())
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((err) => console.error('could not get user', err));
  }

  componentDidMount() {
    this.getTheUser();
  }

  render() {
    const { user } = this.state;

    return (
      <div className="Profile">
        <h1>{user.username}</h1>
      </div>
    );
  }
}

export default Profile;
