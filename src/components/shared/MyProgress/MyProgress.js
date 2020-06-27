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
      <div className="MyProgress col-12 mt-3 mb-3">
          {ratings
            ? <div className="progress-bar-ratings">
                {ratings.map((oneRating) => (
                  <div key={oneRating.id} className="one-progressbar-rating d-flex justify-content-center flex-column col-12">
                    <h6 className="text-white">{oneRating.percent}%</h6>
                    <Progress className={oneRating.title} value={oneRating.percent}>{oneRating.title.charAt(0).toUpperCase() + oneRating.title.slice(1)}</Progress>
                  </div>
                ))}
              </div>
            : ''}
      </div>
    );
  }
}

export default MyProgress;
