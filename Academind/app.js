const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const expressHandle = require('express-handlebars');

const app = express();

const errorController = require('./controllers/errors')

//app.set('view engine', 'pug');
//app.engine('handlebars', expressHandle());
//app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404)

app.listen(4000);


/*
const server = http.createServer(app);

server.listen(3000);
*/