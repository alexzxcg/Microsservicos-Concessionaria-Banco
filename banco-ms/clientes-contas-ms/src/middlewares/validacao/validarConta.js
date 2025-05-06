const { contaValidacaoDTO } = require('../../dtos/conta-validacao-dto/ContaValidacaoDTO');
const yup = require('yup');
const { AppError } = require('../erro/errorHandler'); // Ajuste o caminho conforme sua estrutura

const validarConta = async (req, res, next) => {
  try {
    await contaValidacaoDTO.validate(req.body, { abortEarly: false });
    next();
  } catch (erro) {
    if (erro instanceof yup.ValidationError) {
      next(new AppError('Erro de validação da conta', 400, erro.errors));
      return;
    }
    next(new AppError('Erro interno ao validar conta', 500));
  }
};

module.exports = validarConta;