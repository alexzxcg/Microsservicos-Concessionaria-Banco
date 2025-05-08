const express = require('express');
const financiamentos = require('./financiamentosRoute');

const { notFoundHandler, errorHandler } = require('../middlewares/erro/errorHandler.js');

module.exports = app => {
    app.use(express.json());
    app.use(financiamentos);   
    app.use(notFoundHandler);
    app.use(errorHandler);
};
