import React from 'react';
import './DiscussionCard.scss';

import PropTypes from 'prop-types';

class DiscussionCard extends React.Component {
  static propTypes = {
    discussion: PropTypes.object.isRequired,
  }

  render() {
    const { discussion } = this.props;

    return (
      <div className="DiscussionCard">
        <h1>{discussion.topic}</h1>
      </div>
    );
  }
}

export default DiscussionCard;
