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
      <div className="DiscussionCard m-3 col-12">
        <div className="card">
          <h5 className="card-header">{discussion.topic}</h5>
          <div className="card-body d-flex flex flex-column justify-content-center">
            <div className="m-2">
              {user.profilePic
                ? <img className="rounded-circle img-fluid profile-pic m-2" src={user.profilePic} alt=""/>
                : <img className="rounded-circle img-fluid" src="https://www.allianceplast.com/wp-content/uploads/no-image.png" alt=""/> }
              <p className="card-text ">Conversation started by {user.username}</p>
            </div>
            <Link to={`/chat/${discussion.id}`} className="btn btn-primary align-self-end">Go to Discussion</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscussionCard;
