const express = require('express');
const clientes = require('./clientesRoute');

module.exports = app => {
    app.use(
        express.json(),
        clientes,
    )
}