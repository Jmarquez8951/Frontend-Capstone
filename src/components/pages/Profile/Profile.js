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

  }

  render() {
    return (
      <div className="Profile">
      </div>
    );
  }
}

export default Profile;
