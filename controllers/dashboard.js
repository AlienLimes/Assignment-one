'use strict';

import logger from "../utils/logger.js";
import fishStore from "../models/fish-store.js";
import cleanStore from '../models/clean-store.js';
import { v4 as uuidv4 } from 'uuid';


// get all data from the  fish store ,ready for view
const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    

    const viewData = {
      title: "Fish App Dashboard",
      fishtanks: fishStore.getAllFish(), 
      // fish: fishStore.getAllFish(),
       //updated year
      currentYear: new Date().getFullYear(), 
    };
    
    logger.debug(viewData.fish);
    
    response.render('dashboard', viewData);
  },
     
    addFishtank(request, response) {
       const timestamp = new Date();
       const id = uuidv4();
  const newFishtank = {
    
    id: id,
    title: request.body.title,
    rating: parseInt(request.body.rating), 
    date: timestamp,
    fish: [],
    cleaning: [],
  };
  fishStore.addFishtank(newFishtank);

  // add matching entry to clean-store
  const newCleaning = {
    id: id,
    cleaning: [],
  };
  cleanStore.addFishtank(newCleaning);

  response.redirect('/dashboard');
},

    deleteFishtank(request, response) {
  const fishtankId = request.params.id;
  logger.debug(`Deleting Fishtank ${fishtankId}`);
  fishStore.removeFishtank(fishtankId);
  response.redirect('/dashboard');
},







};

export default dashboard;

