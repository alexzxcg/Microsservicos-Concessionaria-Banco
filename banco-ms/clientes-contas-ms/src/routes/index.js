const express = require('express');
const clientes = require('./clientesRoute');
const contas = require('./contasRoute');
const { notFoundHandler, errorHandler } = require('../middlewares/erro/errorHandler.js');

module.exports = app => {
    app.use(express.json());
  
    app.use(clientes); 
    app.use(contas);   
    app.use(notFoundHandler);
    app.use(errorHandler);
};