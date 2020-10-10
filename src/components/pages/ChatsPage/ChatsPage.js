import React from 'react';
import './ChatsPage.scss';

import chatsData from '../../../helpers/data/chatsData';
import DiscussionCard from '../../shared/DiscussionCard/DiscussionCard';
import usersData from '../../../helpers/data/usersData';

class ChatsPage extends React.Component {
  state = {
    discussions: [],
    users: [],
  }

  getDiscussions = () => {
    chatsData.getAllDiscussions()
      .then((response) => {
        this.setState({ discussions: response });
      })
      .catch((err) => console.error('Could not get discussions', err));
  }

  getUsers = () => {
    usersData.getAllUsers()
      .then((response) => {
        this.setState({ users: response });
      })
      .catch((err) => console.error('could not get users', err));
  }

  componentDidMount() {
    this.getDiscussions();
    this.getUsers();
  }

  render() {
    const { discussions, users } = this.state;

    const buildDiscussionCards = discussions.map((discussion) => (
      users.map((user) => {
        if (user.uid === discussion.uid) {
          return <DiscussionCard discussion={discussion} user={user}/>;
        }
        return '';
      })
    ));

    return (
      <div className="ChatsPage">
        <h1>ChatsPage</h1>
          <div>
            {buildDiscussionCards}
          </div>
      </div>
    );
  }
}

export default ChatsPage;
