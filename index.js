const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// Middleware 
app.use(express.urlencoded());

// Static function is used to access the local files css images and js 
app.use(express.static('./assets'));

//Use express Layouts
app.use(expressLayouts);

//Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Use express Router 
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server");

    }
    console.log("Server is up and runnnig on port ", port);
})