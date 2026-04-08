'use strict';
// helps to fix lowercase issue, not it is always starts with capital letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default capitalize;