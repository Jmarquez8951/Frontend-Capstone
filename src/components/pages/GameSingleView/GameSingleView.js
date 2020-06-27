import React from 'react';
import './GameSingleView.scss';
import gameDB from '../../../helpers/data/gameDB';

import MyProgress from '../../shared/MyProgress/MyProgress';
import ImageCarousel from '../../shared/ImageCarousel/ImageCarousel';

class GameSingleView extends React.Component {
  state = {
    game: {},
    images: [],
  }

  componentDidMount() {
    const { dbGameId } = this.props.match.params;
    gameDB.getSingleGame(dbGameId)
      .then((response) => this.setState({ game: response }))
      .catch((err) => console.error('could not get game', err));
    gameDB.getGameScreenshots(dbGameId)
      .then((response) => this.setState({ images: response }))
      .catch((err) => console.error('could not get images', err));
  }

  render() {
    const { game, images } = this.state;

    return (
      <div className="GameSingleView">
        <h1>{game.name}</h1>
        <div>
          <img className="img-background" src={game.background_image} alt="background"/>
          <p>{game.released}</p>
        </div>
        <p>{game.description_raw}</p>
        <div className="m-5" >
          <ImageCarousel images={images}/>
        </div>
        <h2>Ratings</h2>
        <div className="ratings d-flex flex justify-content-between">
          <div className="p-1 row bg-warning rounded">
            <img className="metacritic m-2" src="https://pbs.twimg.com/profile_images/527528131171590144/EQXs3lpX_400x400.png" alt="metacritic logo" />
            <p className="my-auto mr-1">{game.metacritic}</p>
            </div>
            {game.website
              ? <div className="m-1">
                  <a className="btn btn-info" href={game.website} target="_blank" rel="noopener noreferrer">Checkout their website</a>
                </div>
              : ''}
        </div>
        {game.ratings
          ? <MyProgress ratings={game.ratings}/>
          : ''}
      </div>
    );
  }
}

export default GameSingleView;
