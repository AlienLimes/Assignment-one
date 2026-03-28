'use strict';

import logger from "../utils/logger.js";
import fishStore from "../models/fish-store.js";

// get all data from the  fish store ,ready for view
const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    

    const viewData = {
      title: "Fish App Dashboard",
      fish: fishStore.getAllFish(),
       //updated year
      currentYear: new Date().getFullYear(), 
    };
    
    logger.debug(viewData.fish);
    
    response.render('dashboard', viewData);
  },
};

export default dashboard;

