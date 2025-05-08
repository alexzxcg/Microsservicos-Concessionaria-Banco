const { Router } = require('express');
const FinanciamentoController = require('../controllers/FinanciamentoController.js');
const validarFinanciamento = require('../middlewares/validacao/validarFinanciamento.js');

const router = Router();
const financiamentoController = new FinanciamentoController();

router.get('/contas/:contaId/financiamentos', financiamentoController.buscaTodos);
router.post('/financiamentos/solicitar', validarFinanciamento, financiamentoController.criaRegistro);
router.get('/contas/:contaId/financiamentos/:financiamentoId', financiamentoController.buscaPorId);
router.patch('/financiamentos/:id/aprovar', financiamentoController.aprovaFinanciamento);

//router.put('/financiamentos/:id', financiamentoController.atualiza);
//router.delete('/financiamentos/:id', financiamentoController.exclui);

module.exports = router;