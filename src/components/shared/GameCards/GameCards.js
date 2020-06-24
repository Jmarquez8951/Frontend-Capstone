import React from 'react';
import './GameCards.scss';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class GameCards extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
  }

  render() {
    const { game } = this.props;
    const singleLink = `/game/${game.slug}/${game.id}`;
    const gameGenres = game.genres.map((genre) => (
      <p key={genre.id} className="text-white bg-info border border-dark rounded m-1 pr-2 pl-2">{genre.name}</p>
    ));
    return (
      <div className="GameCards m-3 col-3 d-flex flex">
        <div className="card bg-dark p-2">
          <img src={game.short_screenshots[0].image} className="card-img-top border border-dark rounded" alt="game artwork"/>
          <div className="card-body rounded bg-secondary m-1">
            <h5 className="card-title text-white">{game.name}</h5>
            <div className="d-flex flex-wrap justify-content-center">
              {gameGenres}
            </div>
            <p className="text-white">Rating: {game.rating} <i className="fas fa-star"></i></p>
            <Link className="btn btn-dark m-1" to={singleLink}>More Info</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCards;
