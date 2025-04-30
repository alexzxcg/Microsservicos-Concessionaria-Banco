const { contaValidacaoDTO }  = require('../../dtos/conta-validacao-dto/ContaValidacaoDTO');
const yup = require('yup');

const validarConta = async (req, res, next) => {
  try {
    await contaValidacaoDTO.validate(req.body, { abortEarly: false }); 
    next(); 
  } catch (erro) {
    if (erro instanceof yup.ValidationError) {
      return res.status(400).json({ mensagens: erro.errors });
    }

    return res.status(500).json({ mensagem: 'Erro interno ao validar conta', erro: erro.message });
  }
};

module.exports = validarConta;
