
"use strict";
import logger from "../utils/logger.js";
import fishStore from "../models/fish-store.js";
import accounts from './accounts.js';

import userStore from '../models/user-store.js';



const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

      // const fishtanks = fishStore.getAllFish();
      const fishtanks = fishStore.getUserFishtanks(loggedInUser.id);

      let numUsers = userStore.getAllUsers().length;

      // logger.debug('Number of users: ' + numUsers);

      let numFishtanks = fishtanks.length;
      let numFish = fishtanks.reduce((total, fishtank) => total + fishtank.fish.length, 0);
      // let average = numFishtanks > 0 ? (numFish / numFishtanks).toFixed(2) : 0;
      let average = numFishtanks > 0 ? Math.floor(numFish / numFishtanks) : 0;

      let totalRating = fishtanks.reduce((total, fishtank) => total + parseInt(fishtank.rating), 0);
      let avgRating = numFishtanks > 0 ? totalRating / numFishtanks : 0;

      let maxRating = fishtanks.length > 0 ? Math.max(...fishtanks.map(fishtank => fishtank.rating)) : 0;
      let maxRated = fishtanks.filter(fishtank => fishtank.rating === maxRating);
      let favTitles = maxRated.map(fishtank => fishtank.title);

      let maxFish = fishtanks.length > 0 ? Math.max(...fishtanks.map(fishtank => fishtank.fish.length)) : 0;
      let mostFishTanks = fishtanks.filter(fishtank => fishtank.fish.length === maxFish);
      let mostFishTitles = mostFishTanks.map(fishtank => fishtank.title);

      const statistics = {
        displayNumFishtanks: numFishtanks,
        displayNumFish: numFish,
        displayAverage: average,
        displayAvgRating: avgRating.toFixed(2),
        highest: maxRating,
        displayFav: favTitles,
        displayMaxFish: maxFish,
        displayMostFishTanks: mostFishTitles,
        displayNumUsers: numUsers,
      };

      const viewData = {
        title: "Fishtank App Statistics",
        stats: statistics,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render("stats", viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default stats;