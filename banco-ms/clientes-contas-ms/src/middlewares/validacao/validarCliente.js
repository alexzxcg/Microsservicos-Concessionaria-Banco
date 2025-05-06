const { clienteValidacaoDTO } = require('../../dtos/cliente-validacao-dto/clienteValidacaoDTO.js');
const yup = require('yup');
const { AppError } = require('../erro/errorHandler');

const validarCliente = async (req, res, next) => {
  try {
    await clienteValidacaoDTO.validate(req.body, { abortEarly: false });
    next();
  } catch (erro) {
    if (erro instanceof yup.ValidationError) {
      next(new AppError('Erro de validação', 400, erro.errors));
      return;
    }
    next(new AppError('Erro interno ao validar cliente', 500));
  }
};

module.exports = validarCliente;