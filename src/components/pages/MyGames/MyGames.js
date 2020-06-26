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

  render() {
    const { games } = this.state;
    const buildGameCards = games.map((game) => (
      <GameCards removeGame={this.removeGame} key={game.id} game={game} />
    ));

    return (
      <div className="MyGames">
        <h1>MyGames Page</h1>
        {/* <Link className="btn btn-dark" to={'/my-game/21433'}>Click</Link> */}
        <div className="d-flex flex-wrap justify-content-center">
          {buildGameCards}
        </div>
      </div>
    );
  }
}

export default MyGames;
