const max256Caracter = 256;

const mensagemCustomizada = (field: string) => {
  return {
    'string.max': `O campo ${field}  não pode exceder 256 caracteres.`,
    'string.base': `O campo ${field} deve ser uma string.`,
    'string.empty': `O campo ${field} não pode ser vazio.`,
    'any.required': `O campo ${field} é obrigatório.`,
    'any.invalid': `O campo ${field} deve ser um número.`,
    'number.base': `O campo ${field} deve ser um número.`,
    'number.max': `O campo ${field} não pode exceder o máximo de 3 dígitos.`,
  };
};

export { mensagemCustomizada };
