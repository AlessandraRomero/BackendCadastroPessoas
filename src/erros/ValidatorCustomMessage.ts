const mensagemCustomizada = (field: string) => {
  return {
    'string.empty': `o campo ${field} não pode ser vazio`,
    'any.required': `o campo ${field} é obrigatório`,
  };
};
export { mensagemCustomizada };
