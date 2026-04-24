'use strict';

import logger from '../utils/logger.js';
import fishStore from '../models/fish-store.js';
import cleanStore from '../models/clean-store.js';
import { v4 as uuidv4 } from 'uuid';
import capitalize from '../utils/capitalize.js';
import accounts from './accounts.js';

const fishtank = {
  createView(request, response) {

    const fishtankId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    
    logger.debug(`Fishtank id = ${fishtankId}`);

    const fishtank = fishStore.getFishtank(fishtankId);
    const cleaningData = cleanStore.getFishtank(fishtankId);

    fishtank.cleaning = cleaningData ? cleaningData.cleaning : [];

    const viewData = {
      title: 'Fishtank',
      singleFishtank: fishtank,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      currentYear: new Date().getFullYear(),
    };

    response.render('fishtank', viewData);
  },

  addFish(request, response) {
    const fishtankId = request.params.id;
    const newFish = {
      id: uuidv4(),
      name: capitalize(request.body.name),
      species: capitalize(request.body.species),
      color: capitalize(request.body.color),
      gender: capitalize(request.body.gender),
    };
    fishStore.addFish(fishtankId, newFish);
    response.redirect('/fishtank/' + fishtankId);
  },

  addCleaning(request, response) {
    const fishtankId = request.params.id;
    const newCleaning = {
      id: uuidv4(),
      date: request.body.date,
      ammonia: capitalize(request.body.ammonia),
      tempeture: request.body.tempeture,
      phlevel: request.body.phlevel,
    };
    cleanStore.addCleaning(fishtankId, newCleaning);
    response.redirect('/fishtank/' + fishtankId);
  },

  deleteFish(request, response) {
    const fishtankId = request.params.id;
    const fishId = request.params.fishid;
    logger.debug(`Deleting Fish ${fishId} from Fishtank ${fishtankId}`);
    fishStore.removeFish(fishtankId, fishId);
    response.redirect('/fishtank/' + fishtankId);
  },

  deleteCleaning(request, response) {
    const fishtankId = request.params.id;
    const cleaningId = request.params.cleaningid;
    logger.debug(`Deleting Cleaning ${cleaningId} from Fishtank ${fishtankId}`);
    cleanStore.removeCleaning(fishtankId, cleaningId);
    response.redirect('/fishtank/' + fishtankId);
  },

  updateFish(request, response) {
    const fishtankId = request.params.id;
    const fishId = request.params.fishid;
    logger.debug("updating fish" + fishId);
    const updatedFish = {
      id: fishId,
      name: capitalize(request.body.name),
      species: capitalize(request.body.species),
      color: capitalize(request.body.color),
      gender: capitalize(request.body.gender),
    };
    fishStore.editFish(fishtankId, fishId, updatedFish);
    response.redirect('/fishtank/' + fishtankId);
  },

  updateCleaning(request, response) {
    const fishtankId = request.params.id;
    const cleaningId = request.params.cleaningid;
    logger.debug("updating cleaning" + cleaningId);
    const updatedCleaning = {
      id: cleaningId,
      date: request.body.date,
      ammonia: capitalize(request.body.ammonia),
      tempeture: request.body.tempeture,
      phlevel: request.body.phlevel,
    };
    cleanStore.editCleaning(fishtankId, cleaningId, updatedCleaning);
    response.redirect('/fishtank/' + fishtankId);
  },

};

export default fishtank;