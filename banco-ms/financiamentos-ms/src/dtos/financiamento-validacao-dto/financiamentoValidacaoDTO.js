const yup = require('yup');

const financiamentoValidacaoDTO = yup.object({
    numeroConta: yup
    .string()
    .matches(/^\d{5}-\d{1}$/, 'O número da conta deve estar no formato 12345-6')
    .required('O número da conta é obrigatório'),

  valorTotalFinanciamento: yup
    .number()
    .positive('O valor total do financiamento deve ser positivo')
    .required('O valor total do financiamento é obrigatório'),

  numeroDeParcelas: yup
    .number()
    .integer('O número de parcelas deve ser um número inteiro')
    .min(1, 'Deve haver ao menos 1 parcela')
    .required('O número de parcelas é obrigatório'),

  tipoFinanciamento: yup
    .string()
    .oneOf(['TOTAL', 'PARCIAL'], 'O tipo de financiamento deve ser TOTAL ou PARCIAL')
    .required('O tipo de financiamento é obrigatório'),

  valorEntrada: yup
    .number()
    .min(0, 'O valor de entrada não pode ser negativo')
    .optional(),
});

module.exports = { financiamentoValidacaoDTO };