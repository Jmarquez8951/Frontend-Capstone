import React from 'react';
import './MyFooter.scss';

class MyFooter extends React.Component {
  render() {
    return (
      <div className="MyFooter">
        <nav class="navbar fixed-bottom footer-color">
          <p className="mx-auto my-auto">Copyright &copy; 2020 GameSafe</p>
        </nav>
      </div>
    );
  }
}

export default MyFooter;
