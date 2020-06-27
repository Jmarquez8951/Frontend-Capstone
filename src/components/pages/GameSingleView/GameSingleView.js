import React from 'react';
import './GameSingleView.scss';
import gameDB from '../../../helpers/data/gameDB';
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
        <img className="img-background" src={game.background_image} alt="background"/>
        <p>{game.description_raw}</p>
        <ImageCarousel images={images}/>
      </div>
    );
  }
}

export default GameSingleView;
