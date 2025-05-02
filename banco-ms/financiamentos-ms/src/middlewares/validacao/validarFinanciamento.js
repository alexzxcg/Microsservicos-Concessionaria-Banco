const { financiamentoValidacaoDTO } = require('../../dtos/financiamento-validacao-dto/financiamentoValidacaoDTO');
const yup = require('yup');

const validarFinanciamento = async (req, res, next) => {
  try {
    await financiamentoValidacaoDTO.validate(req.body, { abortEarly: false });
    next();
  } catch (erro) {
    if (erro instanceof yup.ValidationError) {
      return res.status(400).json({ mensagens: erro.errors });
    }

    return res.status(500).json({ mensagem: 'Erro interno ao validar cliente', erro: erro.message });
  }
};

module.exports = validarFinanciamento;