import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getUserInformation = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const user = {};
      const theUsers = response.data;
      if (theUsers) {
        Object.keys(theUsers).forEach((userId) => {
          theUsers[userId].id = userId;
          user.username = theUsers[userId].username;
          user.id = theUsers[userId].id;
          user.bio = theUsers[userId].bio;
          user.profilePic = theUsers[userId].profilePic;
          user.favoriteGame = theUsers[userId].favoriteGame;
        });
      }
      resolve(user);
    })
    .catch((err) => reject(err));
});

const updateUserInformation = (userId, updatedInfo) => axios.put(`${baseUrl}/users/${userId}.json`, updatedInfo);

export default { getUserInformation, updateUserInformation };
