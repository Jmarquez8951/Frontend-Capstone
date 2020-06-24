import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllMyUsersGames = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/games`)
    .then((response) => {
      const games = [];
      const theGames = response.data;
      if (theGames) {
        Object.keys(theGames).forEach((gameId) => {
          theGames[gameId].id = gameId;
          games.push(theGames[gameId]);
        });
      }
      resolve(games);
    })
    .catch((err) => reject(err));
});

export default { getAllMyUsersGames };
