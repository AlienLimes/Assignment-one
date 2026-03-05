'use strict';

import logger from "../utils/logger.js";
import fishStore from "../models/fish-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Fish App Dashboard",
      fish: fishStore.getAllFish()
    };
    
    logger.debug(viewData.fish);
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;

