'use strict';

import express from 'express';
import routes from "./routes.js";
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));









const handlebars = create({
  extname: '.hbs', 
    helpers: {
      uppercase: (inputString) => {
        return inputString.toUpperCase();
      },

      formatDate: (date) => {
    let dateCreated = new Date(date);
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    };

    return `${dateCreated.toLocaleDateString("en-IE", options)}`;
},  
     highlightPopular: (rating) => {
   let message = rating >= 4 ? "Popular fishtank!" :  "";
   return message;
},


// Extra helper function


// Helper to show colored status
ammoniaHelper: function(value) {
    if (value === '0') return '<span class="ui green label">0 (Safe)</span>';
    if (value === '0.1-0.25') return '<span class="ui orange label">0.1 - 0.25 (Warning)</span>';
    if (value === '0.26-plus') return '<span class="ui red label">0.26+ (Danger)</span>';
    return value;
},

//  Equality function
eq: function(a, b) {
    return a == b;  
},


    },


});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");



//const handlebars = create({extname: '.hbs'});

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));


