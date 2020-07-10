import React from 'react';
import './Games.scss';

import GameCards from '../../shared/GameCards/GameCards';
import MyAlert from '../../shared/MyAlert/MyAlert';

import gameDB from '../../../helpers/data/gameDB';
import MySuccessAlert from '../../shared/MySuccessAlert/MySuccessAlert';

class Games extends React.Component {
  state = {
    gameSearch: '',
    games: [],
    nextPage: '',
    previousPage: '',
    isOpen: false,
    successIsOpen: false,
  }

  getGames = () => {
    gameDB.getAllGames()
      .then((response) => {
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

  previousPageChange = (e) => {
    e.preventDefault();
    const { previousPage } = this.state;
    gameDB.changePage(previousPage)
      .then((response) => {
        this.setState({ games: response.results, nextPage: response.next, previousPage: response.previous });
      })
      .catch((err) => console.error('could not get next page', err));
  }

  nextPageChange = (e) => {
    e.preventDefault();
    const { nextPage } = this.state;
    gameDB.changePage(nextPage)
      .then((response) => {
        this.setState({ games: response.results, nextPage: response.next, previousPage: response.previous });
      })
      .catch((err) => console.error('could not get next page', err));
  }

  toggleAlert = (toggle) => {
    this.setState({ isOpen: toggle });
  }

  toggleSuccess = (toggleForSuccess) => {
    this.setState({ successIsOpen: toggleForSuccess });
  }

  render() {
    const {
      gameSearch,
      games,
      isOpen,
      successIsOpen,
      nextPage,
      previousPage,
    } = this.state;

    const buildGameCards = games.map((game) => (
      <GameCards isOpen={isOpen} successIsOpen={successIsOpen} toggleAlert={this.toggleAlert} toggleSuccess={this.toggleSuccess} key={game.id} game={game} />
    ));
    return (
      <div className="Games">
        <MySuccessAlert successIsOpen={successIsOpen} toggleSuccess={this.toggleSuccess}/>
        <MyAlert isOpen={isOpen} toggleAlert={this.toggleAlert}/>
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
          <div className="d-flex flex justify-content-center">
          {previousPage
            ? <button className="btn btn-secondary m-3" onClick={this.previousPageChange}>Previous</button>
            : ''
          }
          {nextPage
            ? <button className="btn btn-secondary m-3" onClick={this.nextPageChange}>Next</button>
            : ''
          }
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
