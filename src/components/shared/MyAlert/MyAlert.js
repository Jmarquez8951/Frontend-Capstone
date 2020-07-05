import React from 'react';
import './MyAlert.scss';

import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

class MyAlert extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleAlert: PropTypes.func.isRequired,
  }

  render() {
    const { isOpen, toggleAlert } = this.props;
    const toggle = () => {
      toggleAlert(!isOpen);
    };

    return (
      <div className='MyAlert'>
        <Alert className="bg-danger mx-auto col-6 m-3" isOpen={isOpen} toggle={toggle}>
          Game cannot be added to your vault.
        </Alert>
      </div>
    );
  }
}

export default MyAlert;
