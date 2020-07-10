import axios from 'axios';

const baseUrl = 'https://api.rawg.io/api/games';

const getAllGames = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}`)
    .then((response) => {
      const games = response.data;
      resolve(games);
    })
    .catch((err) => reject(err));
});

const searchForGame = (gameBeingSearched) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}?search=${gameBeingSearched}`)
    .then((response) => {
      const games = response.data;
      resolve(games);
    })
    .catch((err) => reject(err));
});

const getSingleGame = (gameId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${gameId}`)
    .then((response) => {
      const game = response.data;
      resolve(game);
    })
    .catch((err) => reject(err));
});

const getGameScreenshots = (gameId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${gameId}/screenshots`)
    .then((response) => {
      const images = [];
      const theImages = response.data.results;
      theImages.forEach((img) => {
        const newImage = {
          id: img.id,
          src: img.image,
        };
        images.push(newImage);
      });
      resolve(images);
    })
    .catch((err) => reject(err));
});

const changePage = (pageToChangeTo) => new Promise((resolve, reject) => {
  axios.get(`${pageToChangeTo}`)
    .then((response) => {
      const games = response.data;
      resolve(games);
    })
    .catch((err) => reject(err));
});

export default {
  searchForGame,
  getAllGames,
  getSingleGame,
  getGameScreenshots,
  changePage,
};
