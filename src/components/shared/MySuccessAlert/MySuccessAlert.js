import React from 'react';
import './MySuccessAlert.scss';

import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

class MySuccessAlert extends React.Component {
  static propTypes = {
    successIsOpen: PropTypes.bool.isRequired,
    toggleSuccess: PropTypes.func.isRequired,
  }

  render() {
    const { successIsOpen, toggleSuccess } = this.props;
    const successToggle = () => {
      toggleSuccess(!successIsOpen);
    };

    return (
      <div className="MySuccessAlert">
        <Alert className="bg-success mx-auto col-6 m-3" isOpen={successIsOpen} toggle={successToggle}>
          Game has been added to your vault.
        </Alert>
      </div>
    );
  }
}

export default MySuccessAlert;
