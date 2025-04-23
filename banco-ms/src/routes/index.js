const express = require('express');
const clientes = require('./clientesRoute');
const financiamentos = require('./financiamentosRoute');

module.exports = app => {
    app.use(
        express.json(),
        clientes,
        financiamentos
    )
}