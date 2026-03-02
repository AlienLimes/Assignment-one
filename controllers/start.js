'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "Fish Tank App",
      info: appStore.getAppInfo(),
      //updated year
      currentYear: new Date().getFullYear() 
    };
    
    response.render('start', viewData);   
  },
};

export default start;
