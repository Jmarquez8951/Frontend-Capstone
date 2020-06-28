import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getUserInformation = (Uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const user = [];
      const theUsers = response.data;
      if (theUsers) {
        theUsers.foreach((oneUser) => {
          if (oneUser.uid === Uid) {
            user.push(oneUser);
          }
        });
      }
      resolve(user);
    })
    .catch((err) => reject(err));
});

export default { getUserInformation };
