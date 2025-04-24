const express = require('express');
const financiamentos = require('./financiamentosRoute');

module.exports = app => {
    app.use(
        express.json(),
        financiamentos
    )
}