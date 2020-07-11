import React from 'react';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <img src="https://i.imgur.com/BBGvMxI.png" alt="Logo"/>
        <p>Hello welcome to GameSafe. This website was created with the sole purpose
          of helping out fellow game enthusiast to keep track of all their games from
          PC to Xbox and various other systems.
        </p>
      </div>
    );
  }
}

export default Home;
