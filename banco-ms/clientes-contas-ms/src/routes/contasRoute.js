const { Router } = require('express');
const ContaController = require('../controllers/ContaController.js');
const { errorHandler, notFoundHandler } = require('../middlewares/erro/errorHandler.js');

const contaController = new ContaController();

const router = Router();

router.get('/contas/:numeroDaConta', contaController.buscarContaPorNumero);
router.get('/contas/:contaId/dados-financiamento', contaController.buscaDadosParaFinanciamento);
router.put('/contas/:contaId/alterar-saldo', contaController.alterarSaldo);

router.use(notFoundHandler); 
router.use(errorHandler);   

module.exports = router;