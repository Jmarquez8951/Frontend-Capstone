import React from 'react';
import './MyGameSingleView.scss';
import gameDB from '../../../helpers/data/gameDB';

import MyProgress from '../../shared/MyProgress/MyProgress';
import ImageCarousel from '../../shared/ImageCarousel/ImageCarousel';
import myGamesData from '../../../helpers/data/myGamesData';

class GameSingleView extends React.Component {
  state = {
    game: {},
    images: [],
    wishlist: false,
  }

  getAllInfo = () => {
    const { dbGameId, gameId } = this.props.match.params;
    gameDB.getSingleGame(dbGameId)
      .then((response) => this.setState({ game: response }))
      .catch((err) => console.error('could not get game', err));
    gameDB.getGameScreenshots(dbGameId)
      .then((response) => this.setState({ images: response }))
      .catch((err) => console.error('could not get images', err));
    myGamesData.getWishlistValue(gameId)
      .then((response) => this.setState({ wishlist: response }))
      .catch((err) => console.error('could not get value of wishlist', err));
  }

  componentDidMount() {
    this.getAllInfo();
  }

  removeThisGame = (e) => {
    e.preventDefault();
    const { gameId } = this.props.match.params;
    myGamesData.removeThisGame(gameId)
      .then(() => this.props.history.push('/my-games'))
      .catch((err) => console.error('could not remove game', err));
  }

  addGameToWishList = (e) => {
    e.preventDefault();
    const { gameId } = this.props.match.params;
    myGamesData.addToWishlist(gameId)
      .then(() => this.getAllInfo())
      .catch((err) => console.error('could not add to wishlist', err));
  }

  removeGameFromWishList = (e) => {
    e.preventDefault();
    const { gameId } = this.props.match.params;
    myGamesData.removeFromWishlist(gameId)
      .then(() => this.getAllInfo())
      .catch((err) => console.error('could not remove game from wishlist', err));
  }

  render() {
    const { game, images, wishlist } = this.state;
    const hasRatings = game.ratings;

    return (
      <div className="GameSingleView">
        <div className="d-flex justify-content-between">
          <button className="btn btn-danger m-3" onClick={this.removeThisGame}>Remove From My Games</button>
          {wishlist
            ? <button onClick={this.removeGameFromWishList} className="btn btn-danger m-3"><i class="fas fa-trash"></i> Remove From My Wishlist</button>
            : <button onClick={this.addGameToWishList} className="btn btn-success m-3"><i class="fas fa-cart-plus"></i> Add To My Wishlist</button>
            }
        </div>
        <h1 className="font-weight-bold">{game.name}</h1>
        <div>
          <img className="img-background rounded border border-dark" src={game.background_image} alt="background"/>
          <p className="m-3">{game.released}</p>
          {game.esrb_rating
            ? <p className="font-weight-bold" key={game.esrb_rating.id}>ESRB Rating: {game.esrb_rating.name}</p>
            : ''}
        </div>
        <div className="description border border-dark rounded">
          <h2>Description</h2>
          <p>{game.description_raw}</p>
          {game.developers
            ? <div className="developer">
                {game.developers.map((developer) => (
                  <div key={developer.id}>
                    <h5>{developer.name}</h5>
                    <p>Games released: {developer.games_count}</p>
                  </div>
                ))}
            </div>
            : ''}
            <div className="d-flex flex flex-wrap justify-content-center">
              <h3>Genres:</h3>
              { game.genres ? (game.genres.map((genre) => (
                <p key={genre.id} className="bg-warning text-dark border border-dark rounded my-auto m-1 pr-2 pl-2">{genre.name}</p>
              ))) : ('') }
            </div>
            <div className="tags">
                <h3>Game Tags:</h3>
                <div className="d-flex flex flex-wrap justify-content-center m-2">
                {game.tags
                  ? (game.tags.map((oneTag) => (
                    <div className="tag col-3 bg-secondary rounded border border-dark m-2" key={oneTag.id}>
                      <p className="my-auto">{oneTag.name}</p>
                    </div>)))
                  : ''}
                </div>
            </div>
          </div>
        <div className="carousel m-5" >
          <ImageCarousel images={images}/>
        </div>
        {Array.isArray(game.ratings) && hasRatings.length
          ? <div className="ratings">
        <h2>Ratings</h2>
        <div className="d-flex flex justify-content-between">
            {game.metacritic_url !== ''
              ? <div key={game.metacritic} className="ml-3 p-1 row bg-warning rounded">
                  <a href={game.metacritic_url} target="_blank" rel="noopener noreferrer" >
                    <img className="metacritic m-2" src="https://pbs.twimg.com/profile_images/527528131171590144/EQXs3lpX_400x400.png" alt="metacritic logo" />
                  </a>
                  <p className="my-auto mr-1">{game.metacritic}</p>
                </div>
              : <div className="ml-3 p-1 row bg-warning rounded">
                  <img className="metacritic m-2" src="https://pbs.twimg.com/profile_images/527528131171590144/EQXs3lpX_400x400.png" alt="metacritic logo" />
                  <p className="my-auto mr-1">{game.metacritic}</p>
                </div>}
            {game.website
              ? <div key="website-link" className="m-1 mr-3">
                  <a className="btn btn-info" href={game.website} target="_blank" rel="noopener noreferrer">Checkout their website</a>
                </div>
              : ''}
        </div>
        {game.ratings
          ? <div key="ratings" className="col-12 d-flex flex-column justify-content-center">
              <MyProgress ratings={game.ratings}/>
            </div>
          : ''}
        {game.reddit_url
          ? <div key="reddit-url" className="reddit mt-3 mb-3 text-white">
              <i className="fab fa-reddit-square reddit-logo"></i>
              <h4>{game.reddit_name}</h4>
              <p>{game.reddit_description}</p>
              <a className="btn btn-info" href={game.reddit_url} target="_blank" rel="noopener noreferrer">Checkout their Reddit Page</a>
            </div>
          : ''}
          </div>
          : ''}
          {game.platforms
            ? <div key="platforms" className="platforms">
              <h2>Available Here</h2>
              {game.stores
                ? <div className="d-flex flex flex-wrap justify-content-center">
                  {game.stores.map((oneStore) => (
                  <div key={oneStore.id} className="store bg-warning border border-dark rounded col-3 m-2 p-2">
                    <h3>{oneStore.store.name}</h3>
                    <a className="btn btn-info col-7" href={oneStore.url} target="_blank" rel="noopener noreferrer">Get Game Here</a>
                  </div>
                  ))}
                </div>
                : ''}
             </div>
            : ''}
      </div>
    );
  }
}

export default GameSingleView;
