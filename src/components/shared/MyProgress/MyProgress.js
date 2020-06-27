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
            ? <Progress multi>
                <Progress bar className={ratings[0].title} value={ratings[0].percent}>{ratings[0].title.charAt(0).toUpperCase() + ratings[0].title.slice(1)}</Progress>
                <Progress bar className={ratings[1].title} value={ratings[1].percent}>{ratings[1].title.charAt(0).toUpperCase() + ratings[1].title.slice(1)}</Progress>
                <Progress bar className={ratings[2].title} value={ratings[2].percent}>{ratings[2].title.charAt(0).toUpperCase() + ratings[2].title.slice(1)}</Progress>
                <Progress bar className={ratings[3].title} value={ratings[3].percent}>{ratings[3].title.charAt(0).toUpperCase() + ratings[3].title.slice(1)}</Progress>
              </Progress>
            : ''}
      </div>
    );
  }
}

export default MyProgress;
