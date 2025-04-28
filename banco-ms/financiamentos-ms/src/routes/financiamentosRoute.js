const { Router } = require('express');
const FinanciamentoController = require('../controllers/FinanciamentoController.js');

const router = Router();
const financiamentoController = new FinanciamentoController();

router.get('/contas/:contaId/financiamentos', (req, res) => financiamentoController.buscaTodos(req, res));
router.post('/financiamentos/solicitar', (req, res) => financiamentoController.criaRegistro(req, res));
router.get('/contas/:contaId/financiamentos/:financiamentoId', (req, res) => financiamentoController.buscaPorId(req, res));
router.patch('/financiamentos/:id/aprovar', (req, res) => financiamentoController.aprovaFinanciamento(req, res));

//Falta implementar
router.put('/financiamentos/:id', (req, res) => financiamentoController.atualiza(req, res));
router.delete('/financiamentos/:id', (req, res) => financiamentoController.exclui(req, res));

module.exports = router;