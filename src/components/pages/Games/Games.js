import React from 'react';
import './Games.scss';
import gameDB from '../../../helpers/data/gameDB';
// import { Link } from 'react-router-dom';

class Games extends React.Component {
  state = {
    gameSearch: '',
    games: [],
    nextPage: '',
    previousPage: '',
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
    const { gameSearch } = this.state;

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
      </div>
    );
  }
}

export default Games;
