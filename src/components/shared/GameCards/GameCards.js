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
    const singleLink = `/game/${game.id}`;
    return (
      <div className="GameCards m-3 col-3 d-flex">
        <h4>{game.name}</h4>
        <Link className="btn btn-dark m-1" to={singleLink}>Single Link</Link>
      </div>
    );
  }
}

export default GameCards;
