import React from 'react';
import './Profile.scss';

import { Link } from 'react-router-dom';

import usersData from '../../../helpers/data/usersData';
import authData from '../../../helpers/data/authData';
import myGamesData from '../../../helpers/data/myGamesData';

class Profile extends React.Component {
  state = {
    user: {},
    wishlistGames: [],
  }

  getTheUser = () => {
    usersData.getUserInformation(authData.getUid())
      .then((response) => {
        this.setState({ user: response });
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

  render() {
    const { user, wishlistGames } = this.state;

    const gamesFromWishlist = wishlistGames.map((oneGame) => (
      <div key={oneGame.id} className="wishlistGame d-flex flex flex-column border border-dark bg-secondary rounded text-white m-1 p-3 col-6 mx-auto">
        <h6>{oneGame.gameName}</h6>
        <img className="wishlist-img mx-auto rounded" src={oneGame.imgUrl} alt="game cover"/>
        <Link className="btn btn-info mt-3" to={`/my-game/${oneGame.id}/${oneGame.dbGameId}`}><small>Go to Page</small></Link>
      </div>
    ));

    return (
      <div className="Profile d-flex flex-wrap justify-content-start">
        {user.username
          ? <div className="col-12">
              <h1>My Page</h1>
              <div className="row">
                <div className="d-flex flex align-content-start col-3">
                  <img src={user.profilePic} alt='profile' className="profile-pic border border-dark rounded-circle"/>
                </div>
                <div className="flex-column m-2 align-content-end col-5">
                  <div className="border border-dark rounded bg-warning m-1 p-1">
                    <h4>Display Name:</h4>
                    <p>{user.username}</p>
                  </div>
                  <div className="border border-dark rounded bg-warning m-1 p-1">
                    <h4 className="mx-auto">Favorite Game:</h4>
                    <p className="my-auto">{user.favoriteGame}</p>
                  </div>
                  <div className="border border-dark rounded bg-warning m-1 p-1">
                    <h4 className="mx-auto">Bio:</h4>
                    <p className="my-auto">{user.bio}</p>
                  </div>
                </div>
                <div className="wishlist justify-content-center col-3 rounded border border-dark bg-success pt-1 pb-3">
                  <h3><u>My Wishlist</u></h3>
                  <div className="d-flex flex-column">
                    {gamesFromWishlist}
                  </div>
                </div>
              </div>
            </div>
          : <h1>Create Your Profile</h1>}
      </div>
    );
  }
}

export default Profile;
