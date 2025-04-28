const express = require('express');
const clientes = require('./clientesRoute');
const contas = require('./contasRoute');

module.exports = app => {
    app.use(
        express.json(),
        clientes,
        contas,
    )
}