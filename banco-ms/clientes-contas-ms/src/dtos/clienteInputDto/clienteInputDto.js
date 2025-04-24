const yup = require('yup');

const clienteInputDto = yup.object({
  nome: yup.string().min(3, 'O nome deve ter no mínimo 3 caracteres').required('O nome é obrigatório'),
  email: yup.string().email('O email deve ser válido').required('O email é obrigatório'),
  cpf: yup.string().length(11, 'O CPF deve ter 11 caracteres').required('O CPF é obrigatório'),
  renda_mensal: yup.number().positive('A renda mensal deve ser um valor positivo').optional(), // Renda mensal não é obrigatória
  data_nascimento: yup.date().required('A data de nascimento é obrigatória'),
  telefone: yup.string().required('O telefone é obrigatório'), // Telefone obrigatório
  rua: yup.string().required('A rua é obrigatória'), // Endereço obrigatório
  numero: yup.string().required('O número é obrigatório'), // Endereço obrigatório
  bairro: yup.string().required('O bairro é obrigatório'), // Endereço obrigatório
  cidade: yup.string().required('A cidade é obrigatória'), // Endereço obrigatório
  estado: yup.string().required('O estado é obrigatório'), // Endereço obrigatório
  cep: yup.string().required('O CEP é obrigatório'), // Endereço obrigatório
});

module.exports = { clienteInputDto };