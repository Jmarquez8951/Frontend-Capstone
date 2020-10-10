import React from 'react';
import './DiscussionCard.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class DiscussionCard extends React.Component {
  static propTypes = {
    discussion: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const { discussion, user } = this.props;

    return (
      <div className="DiscussionCard m-3">
        <div className="card">
          <h5 className="card-header">{discussion.topic}</h5>
          <div className="card-body flex justify-content-between">
            <Link to={`/chat/${discussion.id}`} className="btn btn-primary align-self-end">Go to Discussion</Link>
          </div>
          <footer className="flex flex-wrap">
            <small className="card-text ">Created by {user.username}</small>
          </footer>
        </div>
      </div>
    );
  }
}

export default DiscussionCard;
