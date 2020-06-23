import React from 'react';
import './MyGames.scss';
import { Link } from 'react-router-dom';

class MyGames extends React.Component {
  render() {
    return (
      <div className="MyGames">
        <h1>MyGames Page</h1>
        <Link className="btn btn-dark" to={'/my-game/21433'}>Click</Link>
      </div>
    );
  }
}

export default MyGames;
