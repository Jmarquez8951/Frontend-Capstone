import React from 'react';
import './MyGames.scss';

import GameCards from '../../shared/GameCards/GameCards';

import myGamesData from '../../../helpers/data/myGamesData';
import authData from '../../../helpers/data/authData';

class MyGames extends React.Component {
  state = {
    games: [],
  }

  getMyGames = () => {
    const uid = authData.getUid();
    myGamesData.getAllMyUsersGames(uid)
      .then((response) => {
        this.setState({ games: response });
      })
      .catch((err) => console.error('could not get your games', err));
  }

  removeGame = (gameId) => {
    myGamesData.removeThisGame(gameId)
      .then(() => this.getMyGames())
      .catch((err) => console.error('could not remove game', err));
  }

  componentDidMount() {
    this.getMyGames();
  }

  updateWishlist = (gameId) => {
    myGamesData.addToWishlist(gameId)
      .then(() => this.getMyGames())
      .catch((err) => console.error('could not remove from wishlist', err));
  }

  wishlistRemove = (gameId) => {
    myGamesData.removeFromWishlist(gameId)
      .then(() => this.getMyGames())
      .catch((err) => console.error('could not remove from wishlist', err));
  }

  render() {
    const { games } = this.state;
    const buildGameCards = games.map((game) => (
      <GameCards wishlistRemove={this.wishlistRemove} updateWishlist={this.updateWishlist} removeGame={this.removeGame} key={game.id} game={game} />
    ));

    return (
      <div className="MyGames">
        <h1>My Vault</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {buildGameCards}
        </div>
      </div>
    );
  }
}

export default MyGames;
