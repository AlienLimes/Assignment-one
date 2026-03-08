'use strict';

import logger from "../utils/logger.js";

import appStore from "../models/app-store.js";

// home controller
const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    


    // this creates list that can be connected to the view
    const viewData = {

      // titel of the tap on the page
      title: "FishTank App",
      info: appStore.getAppInfo(),
      //updated year
      currentYear: new Date().getFullYear() 
    };
    
    response.render('start', viewData);   
  },
};

export default start;
