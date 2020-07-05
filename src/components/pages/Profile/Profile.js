import React from 'react';
import './Profile.scss';

import { Link } from 'react-router-dom';

import MyModal from '../../shared/MyModal/MyModal';

import usersData from '../../../helpers/data/usersData';
import authData from '../../../helpers/data/authData';
import myGamesData from '../../../helpers/data/myGamesData';

class Profile extends React.Component {
  state = {
    user: {},
    wishlistGames: [],
    isOpen: false,
    valueToChange: '',
    createUsername: '',
    createProfilePic: '',
    createFavoriteGame: '',
    createBio: '',
  }

  getTheUser = () => {
    usersData.getUserInformation(authData.getUid())
      .then((response) => {
        this.setState({
          user: response,
          createBio: response.bio,
          createFavoriteGame: response.favoriteGame,
          createProfilePic: response.profilePic,
          createUsername: response.username,
        });
      })
      .catch((err) => console.error('could not get user', err));
    myGamesData.getWishlistGames(authData.getUid())
      .then((response) => {
        this.setState({ wishlistGames: response });
      })
      .catch((err) => console.error('could not get wishlist', err));
  }

  componentDidMount() {
    this.getTheUser();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  valueUserIsEditing = (value) => {
    this.setState({ valueToChange: value });
  }

  createProfilePicChange = (e) => {
    e.preventDefault();
    this.setState({ createProfilePic: e.target.value });
  }

  createUsernameChange = (e) => {
    e.preventDefault();
    this.setState({ createUsername: e.target.value });
  }

  createFavGameChange = (e) => {
    e.preventDefault();
    this.setState({ createFavoriteGame: e.target.value });
  }

  createBioChange = (e) => {
    e.preventDefault();
    this.setState({ createBio: e.target.value });
  }

  createUserProfile = (e) => {
    e.preventDefault();
    const {
      createUsername,
      createProfilePic,
      createFavoriteGame,
      createBio,
    } = this.state;
    const newProfile = {
      username: createUsername,
      profilePic: createProfilePic,
      favoriteGame: createFavoriteGame,
      bio: createBio,
      uid: authData.getUid(),
    };
    usersData.createNewUserProfile(newProfile)
      .then(() => this.getTheUser())
      .catch((err) => console.error('could not create user profile', err));
  }

  render() {
    const {
      user,
      wishlistGames,
      isOpen,
      valueToChange,
    } = this.state;

    const gamesFromWishlist = wishlistGames.map((oneGame) => (
      <div key={oneGame.id} className="wishlistGame d-flex flex flex-column border border-dark bg-secondary rounded text-white m-1 p-3 col-6 mx-auto">
        <h6>{oneGame.gameName}</h6>
        <img className="wishlist-img mx-auto rounded" src={oneGame.imgUrl} alt="game cover"/>
        <Link className="btn btn-info mt-3" to={`/my-game/${oneGame.id}/${oneGame.dbGameId}`}><small>Go to Page</small></Link>
      </div>
    ));

    return (
      <div className="Profile d-flex flex-wrap justify-content-start">
        <MyModal isOpen={isOpen} toggle={this.toggle} editing={valueToChange} getTheUser={this.getTheUser} />
        {user.username
          ? <div className="col-12">
              <h1>My Page</h1>
              <div className="row">
                <div className="align-content-start col-3">
                  <div onClick={() => { this.toggle(); this.valueUserIsEditing('.profile-pic'); }} className="profile-pic-container">
                    <i className="fas fa-edit hide"></i>
                    <img src={user.profilePic} alt='profile' className="profile-pic border border-dark rounded-circle"/>
                  </div>
                </div>
                <div className="flex-column m-2 align-content-end col-5">
                  <div className="border border-dark rounded bg-warning m-1 p-1">
                    <h4>Display Name:</h4>
                    <p className="username" onClick={() => { this.toggle(); this.valueUserIsEditing('.username'); }}><i className="fas fa-edit hide"></i> {user.username}</p>
                  </div>
                  <div className="border border-dark rounded bg-warning m-1 p-1">
                    <h4 className="mx-auto">Favorite Game:</h4>
                    <p className="my-auto favorite-game" onClick={() => { this.toggle(); this.valueUserIsEditing('.favorite-game'); } }><i className="fas fa-edit hide"></i> {user.favoriteGame}</p>
                  </div>
                  <div className="border border-dark rounded bg-warning m-1 p-1">
                    <h4 className="mx-auto">Bio:</h4>
                    <p className="my-auto bio" onClick={() => { this.toggle(); this.valueUserIsEditing('.bio'); }}><i className="fas fa-edit hide"></i> {user.bio}</p>
                  </div>
                </div>
                <div className="wishlist justify-content-center col-3 rounded border border-dark bg-success pt-1 pb-3 m-3">
                  <h3><u>My Wishlist</u></h3>
                  <div className="d-flex flex-column">
                    {gamesFromWishlist}
                  </div>
                </div>
              </div>
            </div>
          : <div className="col-12">
              <h1>Create Your Profile</h1>
              <div className="form-group">
                  <label htmlFor="createProfilePic">Upload Profile Picture</label>
                  <input
                  type="text"
                  className="form-control"
                  id="createProfilePic"
                  aria-describedby="profilePicHelp"
                  onChange={this.createProfilePicChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="createUsername">Create a Username</label>
                  <input
                  type="text"
                  className="form-control"
                  id="createUsername"
                  aria-describedby="createUsernameHelp"
                  onChange={this.createUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="createFavoriteGame">What's Your Favorite Game/s</label>
                  <input
                  type="text"
                  className="form-control"
                  id="createFavoriteGame"
                  aria-describedby="createFavoriteGameHelp"
                  onChange={this.createFavGameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="createBio">Biography</label>
                  <textarea
                  className="form-control"
                  id="createBio"
                  aria-describedby="createBioHelp"
                  onChange={this.createBioChange}
                  rows="3"
                  >
                  </textarea>
                </div>
                <button className="btn btn-secondary" onClick={this.createUserProfile}>Create Profile</button>
            </div>
        }
      </div>
    );
  }
}

export default Profile;
