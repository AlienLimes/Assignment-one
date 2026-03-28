'use strict';

import logger from '../utils/logger.js';
import fishStore from '../models/fish-store.js';
import cleanStore from '../models/clean-store.js';
import { v4 as uuidv4 } from 'uuid';

const fishtank = {
  createView(request, response) {
    const fishtankId = request.params.id;

    // get fishtank by id
    const fishtank = fishStore.getFishtank(fishtankId);
    const cleaningData = cleanStore.getFishtank(fishtankId);

    // attach cleaning directly onto the fishtank object
    fishtank.cleaning = cleaningData.cleaning;

    logger.debug(`Fishtank id = ${fishtankId}`);

    // this creates list that can be connected to the view
    // view inside dashboard tanks
    const viewData = {
      // titel of the tap on the page
      title: 'Fishtank',
      // fishtank details by id with cleaning attached
      singleFishtank: fishtank,
      //updated year
      currentYear: new Date().getFullYear(),
    };

    response.render('fishtank', viewData);
  },

  addFish(request, response) {
    const fishtankId = request.params.id;
    const fishtank = fishStore.getFishtank(fishtankId);
    const newFish = {
      id: uuidv4(),
      name: request.body.name,
      species: request.body.species,
      color: request.body.color,
      gender: request.body.gender,
    };
    fishStore.addFish(fishtankId, newFish);
    response.redirect('/fishtank/' + fishtankId);
  },

  addCleaning(request, response) {
    const fishtankId = request.params.id;
    const newCleaning = {
      date: request.body.date,
      ammonia: request.body.ammonia,
      tempeture: request.body.tempeture,
      phlevel: request.body.phlevel,
    };
    cleanStore.addCleaning(fishtankId, newCleaning);
    response.redirect('/fishtank/' + fishtankId);
  },

};

export default fishtank;