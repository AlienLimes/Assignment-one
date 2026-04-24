
'use strict';

import logger from "../utils/logger.js";
import fishStore from "../models/fish-store.js";
import cleanStore from '../models/clean-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {

  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const fishtanks = searchTerm
        ? fishStore.searchUserFishtanks(searchTerm, loggedInUser.id)
        : fishStore.getUserFishtanks(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;
      let sorted = fishtanks;

      // if (sortField) {
      //   sorted = fishtanks.slice().sort((a, b) => {
      //     if (sortField === "title") {
      //       return a.title.localeCompare(b.title) * order;
      //     }
      //     return 0;
      //   });
      // }
       
      if (sortField) {
  sorted = fishtanks.slice().sort((a, b) => {
    if (sortField === "title") {
      return a.title.localeCompare(b.title) * order;
    }
    if (sortField === "rating") {
      return (a.rating - b.rating) * order;
    }
    return 0;
  });
}


      const viewData = {
        title: "Fishtank App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        fishtanks: sortField ? sorted : fishtanks,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating", 
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
        currentYear: new Date().getFullYear(),
      };

      logger.info('about to render ' + viewData.fishtanks);
      response.render('dashboard', viewData);

    } else {
      response.redirect('/');
    }
  },

  addFishtank(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const timestamp = new Date();
    const id = uuidv4();

    const newFishtank = {
      id: id,
      userid: loggedInUser.id,
      title: request.body.title,
      rating: parseInt(request.body.rating),
      date: timestamp,
      fish: [],
      cleaning: [],
    };
    fishStore.addFishtank(newFishtank);

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