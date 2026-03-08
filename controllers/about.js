'use strict';

import logger from "../utils/logger.js";
import fishStore from '../models/fish-store.js';


const about = {
  createView(request, response) {
    logger.info("About page loading!");
    
const statistics = fishStore.getAllFish();
console.log(statistics)

// const fishstatistics = fishStore.getFishtank();
// console.log(fishstatistics)

    const viewData = {
      // titel of the tap on the page
      title: "About Fish App",
      // get current year for the footer
      currentYear: new Date().getFullYear(),
      statistics: statistics

    };
    
    response.render('about', viewData);   
  },
};

export default about;