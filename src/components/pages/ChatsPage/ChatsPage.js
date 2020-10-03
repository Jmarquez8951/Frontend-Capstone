import React from 'react';
import './ChatsPage.scss';

import chatsData from '../../../helpers/data/chatsData';
import DiscussionCard from '../../shared/DiscussionCard/DiscussionCard';

class ChatsPage extends React.Component {
  state = {
    discussions: [],
  }

  getDiscussions = () => {
    chatsData.getAllDiscussions()
      .then((response) => {
        this.setState({ discussions: response });
      })
      .catch((err) => console.error('Could not get discussions', err));
  }

  componentDidMount() {
    this.getDiscussions();
  }

  render() {
    const { discussions } = this.state;

    const buildDiscussionCards = discussions.map((discussion) => (
      <DiscussionCard discussion={discussion} />
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
