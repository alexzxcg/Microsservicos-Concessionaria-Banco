const { financiamentoValidacaoDTO } = require('../../dtos/financiamento-validacao-dto/financiamentoValidacaoDTO');
const yup = require('yup');
const { AppError } = require('../erro/errorHandler'); 

const validarFinanciamento = async (req, res, next) => {
  try {
    await financiamentoValidacaoDTO.validate(req.body, { abortEarly: false });
    next();
  } catch (erro) {
    if (erro instanceof yup.ValidationError) {
      next(new AppError('Erro de validação do financiamento', 400, erro.errors));
      return;
    }
    next(new AppError('Erro interno ao validar financiamento', 500));
  }
};

module.exports = validarFinanciamento;