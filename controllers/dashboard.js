'use strict';

import logger from "../utils/logger.js";
import fishStore from "../models/fish-store.js";
import cleanStore from '../models/clean-store.js';
import { v4 as uuidv4 } from 'uuid';


// get all data from the  fish store ,ready for view
const dashboard = {
 
  
 //updated creat view

  createView(request, response) {
  logger.info("Dashboard page loading!");
  const searchTerm = request.query.searchTerm || "";
  const fishtanks = searchTerm
    ? fishStore.searchFishtank(searchTerm)
    : fishStore.getAllFish();
  const sortField = request.query.sort;
  const order = request.query.order === "desc" ? -1 : 1;
  let sorted = fishtanks;
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
    fishtanks: sortField ? sorted : fishtanks,
    search: searchTerm,
    titleSelected: request.query.sort === "title",
    ratingSelected: request.query.sort === "rating",
    ascSelected: request.query.order === "asc",
    descSelected: request.query.order === "desc",
  };
  logger.debug(viewData.fishtanks);
  response.render("dashboard", viewData);
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

