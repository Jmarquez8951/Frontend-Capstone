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

const getWishlistValue = (gameId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/games/${gameId}.json`)
    .then((response) => {
      const value = response.data;
      resolve(value.wishList);
    })
    .catch((err) => reject(err));
});

const addToWishlist = (gameId) => axios.patch(`${baseUrl}/games/${gameId}.json`, { wishList: true });

const removeFromWishlist = (gameId) => axios.patch(`${baseUrl}/games/${gameId}.json`, { wishList: false });

const addGameToMyGames = (newGame) => axios.post(`${baseUrl}/games.json`, newGame);

const removeThisGame = (gameId) => axios.delete(`${baseUrl}/games/${gameId}.json`);

export default {
  getAllMyUsersGames,
  addGameToMyGames,
  removeThisGame,
  addToWishlist,
  removeFromWishlist,
  getWishlistValue,
};
