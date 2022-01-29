const http = require('http');

const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('The users page');
    next();
})

app.use('/', (req, res, next) => {
    console.log('The second middleware');
    res.send('<h1>The second middleware has worked!</h1>');
})


app.listen(3000);