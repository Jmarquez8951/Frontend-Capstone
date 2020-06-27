import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllMyUsersGames = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/games.json?orderBy="uid"&equalTo="${uid}"`)
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

const addGameToMyGames = (newGame) => axios.post(`${baseUrl}/games.json`, newGame);

const removeThisGame = (gameId) => axios.delete(`${baseUrl}/games/${gameId}.json`);

export default {
  getAllMyUsersGames,
  addGameToMyGames,
  removeThisGame,
};
