const { Router } = require('express');
const ClienteController = require('../controllers/ClienteController.js');
const ContaController = require('../controllers/ContaController.js');
const validarCliente = require('../middlewares/validacao/validarCliente.js');
const validarConta = require('../middlewares/validacao/validarConta.js');
const { errorHandler, notFoundHandler } = require('../middlewares/erro/errorHandler.js');

const clienteController = new ClienteController();
const contaController = new ContaController();

const router = Router();

router.get('/clientes', clienteController.buscaTodos);
router.get('/clientes/:id', clienteController.buscaPorId);
router.post('/clientes', validarCliente, clienteController.criaRegistro);
router.put('/clientes/:id', clienteController.atualiza);
router.delete('/clientes/:id', clienteController.exclui);

router.get('/clientes/:clienteId/contas', clienteController.buscaContasDoCliente);
router.get('/clientes/:clienteId/contas/:contaId', clienteController.buscaContaPorIdDoCliente);
router.get('/clientes/:clienteId/contas/:contaId/financiamentos', clienteController.buscaContaFinanciamentos);
router.get('/clientes/:clienteId/contas/:contaId/financiamentos/:financiamentoId', clienteController.buscaContaFinanciamentoPorId);

router.post('/clientes/:clienteId/contas', validarConta, contaController.criaRegistro);
router.put('/clientes/:clienteId/contas/:contaId', clienteController.atualizaContaDeCliente);
router.delete('/clientes/:clienteId/contas/:contaId', clienteController.excluiContaDeCliente);

router.use(notFoundHandler);

router.use(errorHandler);

module.exports = router;