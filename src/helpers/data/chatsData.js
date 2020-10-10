import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllDiscussions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/discussions.json`)
    .then((response) => {
      const discussions = [];
      const theDiscussions = response.data;
      if (theDiscussions) {
        Object.keys(theDiscussions).forEach((discussionId) => {
          theDiscussions[discussionId].id = discussionId;
          discussions.push(theDiscussions[discussionId]);
        });
      }
      resolve(discussions);
    })
    .catch((err) => reject(err));
});

export default {
  getAllDiscussions,
};
