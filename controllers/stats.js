"use strict";
import logger from "../utils/logger.js";
import fishStore from "../models/fish-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");

    // app statistics calculations
    const fishtanks = fishStore.getAllFish();

    let numFishtanks = fishtanks.length;

    let numFish = fishtanks.reduce((total, fishtank) => total + fishtank.fish.length, 0);

    let average = numFishtanks > 0 ? (numFish / numFishtanks).toFixed(2) : 0;


    let totalRating = fishtanks.reduce((total, fishtank) => total + parseInt(fishtank.rating), 0);
    let avgRating = numFishtanks > 0 ? totalRating / numFishtanks : 0;

    let maxRating = Math.max(...fishtanks.map(fishtank => fishtank.rating));
    let maxRated = fishtanks.filter(fishtank => fishtank.rating === maxRating);
    let favTitles = maxRated.map(fishtank => fishtank.title);

    //excersize

    let maxFish = Math.max(...fishtanks.map(fishtank => fishtank.fish.length));
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
};

    // const statistics = {
    //   displayNumFishtanks: numFishtanks,
    //   displayNumFish: numFish,
      
    //     displayAverage: average,
    // };

    const viewData = {
      title: "Fishtank App Statistics",
      stats: statistics,
    };

    response.render("stats", viewData);
  },
};

export default stats;