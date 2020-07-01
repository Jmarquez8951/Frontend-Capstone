import React from 'react';
import './MyModal.scss';

import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import usersData from '../../../helpers/data/usersData';
import authData from '../../../helpers/data/authData';

class MyModal extends React.Component {
  state = {
    profileImgUrl: '',
    profileUsername: '',
    profileFavGame: '',
    profileBio: '',
    userId: '',
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    editing: PropTypes.string.isRequired,
    fullyUpdateUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    usersData.getUserInformation(authData.getUid())
      .then((response) => {
        const user = response;
        this.setState({
          profileFavGame: user.favoriteGame,
          profileImgUrl: user.profilePic,
          profileBio: user.bio,
          profileUsername: user.username,
          userId: user.id,
        });
      })
      .catch((err) => console.error('could not get user', err));
  }

  editValue = (e) => {
    e.preventDefault();
    const { toggle, getTheUser } = this.props;
    const {
      profileBio,
      profileFavGame,
      profileImgUrl,
      profileUsername,
      userId,
    } = this.state;
    const updatedUser = {
      profilePic: profileImgUrl,
      bio: profileBio,
      favoriteGame: profileFavGame,
      username: profileUsername,
      uid: authData.getUid(),
    };
    usersData.updateUserInformation(userId, updatedUser)
      .then(() => getTheUser())
      .catch((err) => console.error('could not update user', err));
    toggle();
  }

  imgUrlChange = (e) => {
    e.preventDefault();
    this.setState({ profileImgUrl: e.target.value });
  }

  usernameChange = (e) => {
    e.preventDefault();
    this.setState({ profileUsername: e.target.value });
  }

  favoriteGameChange = (e) => {
    e.preventDefault();
    this.setState({ profileFavGame: e.target.value });
  }

  bioChange = (e) => {
    e.preventDefault();
    this.setState({ profileBio: e.target.value });
  }

  render() {
    const {
      profileImgUrl,
      profileBio,
      profileUsername,
      profileFavGame,
    } = this.state;

    const {
      isOpen,
      toggle,
      editing,
    } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            {editing === '.profile-pic'
              ? <div className="form-group">
                  <label htmlFor="profileEdit">Change Profile Picture</label>
                  <input
                  type="text"
                  className="form-control"
                  id="profileEdit"
                  aria-describedby="profileHelp"
                  value={profileImgUrl}
                  onChange={this.imgUrlChange}
                  />
                </div>
              : ''}
            {editing === '.username'
              ? <div className="form-group">
                  <label htmlFor="usernameEdit">Change Username</label>
                  <input
                  type="text"
                  className="form-control"
                  id="usernameEdit"
                  aria-describedby="usernameHelp"
                  value={profileUsername}
                  onChange={this.usernameChange}
                  />
                </div>
              : ''}
            {editing === '.favorite-game'
              ? <div className="form-group">
                  <label htmlFor="favoriteGameEdit">Change Favorite Game/s</label>
                  <input
                  type="text"
                  className="form-control"
                  id="favoriteGameEdit"
                  aria-describedby="favoriteGameHelp"
                  value={profileFavGame}
                  onChange={this.favoriteGameChange}
                  />
                </div>
              : ''}
            {editing === '.bio'
              ? <div className="form-group">
                  <label htmlFor="bioEdit">Change Biography</label>
                  <input
                  type="text"
                  className="form-control"
                  id="bioEdit"
                  aria-describedby="bioHelp"
                  value={profileBio}
                  onChange={this.bioChange}
                  />
                </div>
              : ''}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editValue}>Submit</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
