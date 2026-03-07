'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const fishStore = {

  store: new JsonStore('./models/fish-store.json', { fishCollection: [] }),
  collection: 'fishCollection',
  array: 'fish',

  getAllFish() {
    return this.store.findAll(this.collection);
  },

getFishtank(id) {
    return this.store.findOneBy(this.collection, (fishtank => fishtank.id === id));
},


};

export default fishStore;




