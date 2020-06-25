import myGamesData from './myGamesData';

const checkIfGoodToAdd = (uid, newGame) => new Promise((resolve, reject) => {
  myGamesData.getAllMyUsersGames(uid)
    .then((response) => {
      const usersGames = response;
      let games = 0;
      usersGames.forEach((oneGame) => {
        if (oneGame.dbGameId === newGame.dbGameId) {
          return '';
        }
        games += 1;
        return '';
      });
      if (usersGames.length === games) {
        myGamesData.addGameToMyGames(newGame)
          .then(() => {});
      }
      resolve();
    })
    .catch((err) => reject(err));
});

export default { checkIfGoodToAdd };
