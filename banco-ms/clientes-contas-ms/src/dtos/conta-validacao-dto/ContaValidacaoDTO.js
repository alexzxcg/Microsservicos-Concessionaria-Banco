const yup = require('yup');

const contaValidacaoDTO = yup.object({
  numero: yup
    .string()
    .required('O número da conta é obrigatório')
    .matches(/^\d{5}-\d{1}$/, 'O número da conta deve estar no formato 12345-6'),
  agencia: yup
    .string()
    .required('A agência é obrigatória'),
  tipo: yup
    .string()
    .oneOf(['corrente', 'poupanca', 'salario'], 'O tipo da conta deve ser "corrente", "poupanca" ou "salario"')
    .required('O tipo da conta é obrigatório')
});

module.exports = { contaValidacaoDTO };