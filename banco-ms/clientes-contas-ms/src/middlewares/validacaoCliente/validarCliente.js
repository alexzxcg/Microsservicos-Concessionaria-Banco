const { clienteInputDto } = require('../../dtos/clienteInputDto/clienteInputDto');
const yup = require('yup');

const validarCliente = async (req, res, next) => {
  try {
    await clienteInputDto.validate(req.body, { abortEarly: false });
    next();
  } catch (erro) {
    if (erro instanceof yup.ValidationError) {
      return res.status(400).json({ mensagens: erro.errors });
    }

    return res.status(500).json({ mensagem: 'Erro interno ao validar cliente', erro: erro.message });
  }
};

module.exports = validarCliente;