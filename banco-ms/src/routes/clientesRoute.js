const { Router } = require('express');
const ClienteController = require('../controllers/ClienteController.js');
const ContaController = require('../controllers/ContaController.js');

const clienteController = new ClienteController();
const contaController = new ContaController();

const router = Router();

router.get('/clientes', (req, res) => clienteController.buscaTodos(req, res));
router.get('/clientes/:id', (req, res) => clienteController.buscaPorId(req, res));
router.post('/clientes', (req, res) => clienteController.criaRegistro(req, res));
router.put('/clientes/:id', (req, res) => clienteController.atualiza(req, res));
router.delete('/clientes/:id', (req, res) => clienteController.exclui(req, res));
router.get('/clientes/:clienteId/contas', (req, res) => clienteController.buscaContasDoCliente(req, res));
router.get('/clientes/:clienteId/contas/:contaId', (req, res) => clienteController.buscaContaPorIdDoCliente(req, res));
router.post('/clientes/:clienteId/contas', (req, res) => contaController.criaRegistro(req, res));
router.put('/clientes/:clienteId/contas/:contaId', (req, res) => clienteController.atualizaContaDeCliente(req, res));
router.delete('/clientes/:clienteId/contas/:contaId', (req, res) => clienteController.excluiContaDeCliente(req, res));

module.exports = router;