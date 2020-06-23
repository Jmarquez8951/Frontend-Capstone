import axios from 'axios';

const baseUrl = 'https://api.rawg.io/api/games';

const searchForGame = (gameBeingSearched) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}?search=${gameBeingSearched}`)
    .then((response) => {
      const games = response.data;
      resolve(games);
    })
    .catch((err) => reject(err));
});

export default { searchForGame };
