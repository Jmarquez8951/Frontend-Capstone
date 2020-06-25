import React from 'react';
import './GameCards.scss';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import smash from '../../../helpers/data/smash';

class GameCards extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
  }

  addToMyGames = (e) => {
    e.preventDefault();
    const { game } = this.props;
    const uid = authData.getUid();
    const newGame = {
      dbGameId: game.id,
      gameName: game.name,
      imgUrl: game.short_screenshots[0].image,
      wishList: false,
      uid,
    };
    smash.checkIfGoodToAdd(uid, newGame)
      .then(() => {})
      .catch((err) => console.error('could not add to games', err));
  }

  render() {
    const { game } = this.props;
    const singleLink = () => {
      if (game.uid) {
        return `/my-game/${game.id}`;
      }
      return `/game/${game.id}`;
    };

    const imgToRender = () => {
      if (game.imgUrl) {
        return <img src={game.imgUrl} className="card-img-top border border-dark rounded" alt="game artwork"/>;
      }
      if (game.short_screenshots[0].image) {
        return <img src={game.short_screenshots[0].image} className="card-img-top border border-dark rounded" alt="game artwork"/>;
      }
      return '';
    };

    const wishlistRender = () => {
      if (game.wishList === true || game.wishList === false) {
        if (game.wishList === true) {
          return <button className="btn btn-danger btn-sm"><i className="fas fa-minus"></i> Remove from Wishlist</button>;
        }
        if (game.wishList === false) {
          return <button className="btn btn-success btn-sm"><i className="fas fa-cart-plus"></i> Add to Wishlist</button>;
        }
      }
      return '';
    };

    return (
      <div className="GameCards m-3 col-3 d-flex flex">
        <div className="card bg-dark p-2">
          {imgToRender()}
          <div className="card-body rounded bg-secondary m-1">
            {game.name
              ? <h5 className="card-title text-white">{game.name}</h5>
              : <h5 className="card-title text-white">{game.gameName}</h5>}
            <div className="d-flex flex-wrap justify-content-center">
              { game.genres ? (game.genres.map((genre) => (
                <p key={genre.id} className="text-white bg-info border border-dark rounded m-1 pr-2 pl-2">{genre.name}</p>
              ))) : ('') }
            </div>
            {game.rating
              ? <p className="text-white">Rating: {game.rating} <i className="fas fa-star"></i></p>
              : ''}
              {wishlistRender()}
              {game.uid
                ? ''
                : <button className="btn btn-success" onClick={this.addToMyGames}>Add To My Games</button>}
            <Link className="btn btn-dark m-1" to={singleLink}>More Info</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GameCards;
