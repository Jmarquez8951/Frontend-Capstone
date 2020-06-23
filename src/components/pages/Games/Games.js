import React from 'react';
import './Games.scss';
import { Link } from 'react-router-dom';

class Games extends React.Component {
  render() {
    return (
      <div className="Games">
        <h1>Games Page</h1>
        <Link className="btn btn-dark" to={'/game/21433'}>Click</Link>
      </div>
    );
  }
}

export default Games;
