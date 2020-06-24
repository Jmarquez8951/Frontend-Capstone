import React from 'react';
import './Games.scss';

import GameCards from '../../shared/GameCards/GameCards';

import gameDB from '../../../helpers/data/gameDB';

class Games extends React.Component {
  state = {
    gameSearch: '',
    games: [],
    nextPage: '',
    previousPage: '',
  }

  getGames = () => {
    gameDB.getAllGames()
      .then((response) => {
        console.log(response.results);
        this.setState({ games: response.results, nextPage: response.next, previousPage: response.previous });
      })
      .catch((err) => console.error('could not get all games', err));
  }

  componentDidMount() {
    this.getGames();
  }

  gameSearchChange = (e) => {
    e.preventDefault();
    this.setState({ gameSearch: e.target.value });
  }

  searchEvent = (e) => {
    e.preventDefault();
    const { gameSearch } = this.state;
    const gameBeingSearched = gameSearch;
    gameDB.searchForGame(gameBeingSearched)
      .then((response) => {
        this.setState({ games: response.results, nextPage: response.next, previousPage: response.previous });
      })
      .catch((err) => console.error('could not get games', err));
  }

  render() {
    const { gameSearch, games } = this.state;
    const buildGameCards = games.map((game) => (
      <GameCards key={game.id} game={game} />
    ));
    return (
      <div className="Games">
        <h1>Games Page</h1>
        <form className="col-12">
          <div className="d-flex">
            <input
            className="col-11"
            type="text"
            id="search-game"
            value={gameSearch}
            onChange={this.gameSearchChange}
            placeholder="Search"
            />
            <button className="btn btn-secondary col-1 ml-2" onClick={this.searchEvent}>Search</button>
          </div>
        </form>
        <div className="d-flex flex-wrap justify-content-center">
          {buildGameCards}
        </div>
      </div>
    );
  }
}

export default Games;
