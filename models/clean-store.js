'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

// get all items from the collection
const cleanStore = {
// file path
  store: new JsonStore('./models/clean-store.json', { fishCollection: [] }),
  collection: 'fishCollection',
   array: 'cleaning',  

  getAllCleaning() {
    return this.store.findAll(this.collection);
    //console.log(this.array)
  },

getFishtank(id) {
    return this.store.findOneBy(this.collection, (fishtank => fishtank.id === id));
},

  addCleaning(id, cleaning) {
    this.store.addItem(this.collection, id, this.array, cleaning);
  },

  removeCleaning(id, cleaningId) {
    this.store.removeItem(this.collection, id, this.array, cleaningId);
},
  addFishtank(fishtank) {
  this.store.addCollection(this.collection, fishtank);
},

  editCleaning(id, cleaningId, updatedCleaning) {
  this.store.editItem(this.collection, id, cleaningId, this.array, updatedCleaning);
},
};

export default cleanStore;




