'use strict';

import logger from '../utils/logger.js';
import fishStore from '../models/fish-store.js';
import cleanStore from '../models/clean-store.js';




const fishtank = {
  createView(request, response) {
    const fishtankId = request.params.id;

    const cleaningData = cleanStore.getFishtank(fishtankId);
    

    logger.debug(`Fishtank id = ${fishtankId}`);

    
    // this creates list that can be connected to the view
    // view inside dashboard tanks
    const viewData = {
      // titel of the tap on the page
      title: 'Fishtank',
      // fishtank details by id
      singleFishtank: fishStore.getFishtank(fishtankId),
      // add cleaning data to view
      singleFishtankCleaning: cleaningData  
    };

    response.render('fishtank', viewData);
   
  },
  
};

export default fishtank;


