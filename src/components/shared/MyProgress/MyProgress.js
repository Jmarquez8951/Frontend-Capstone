import React from 'react';
import './MyProgress.scss';

import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

class MyProgress extends React.Component {
  static propTypes = {
    ratings: PropTypes.array,
  }

  render() {
    const { ratings } = this.props;

    return (
      <div className="MyProgress mt-3 mb-3">
        <Progress multi>
          {ratings.title === 'exceptional'
            ? <Progress bar color="success" value={ratings.percent}>{ratings.title}</Progress>
            : '' }
        </Progress>
      </div>
    );
  }
}

export default MyProgress;
