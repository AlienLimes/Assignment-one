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


};

export default cleanStore;




