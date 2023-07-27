import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoUF?: number;
  sigla?: string;
  nome?: string;
  status?: number;
}
async function filtrosUf(filtros: IRequest) {
  const ufRepository = AppDataSource.getRepository(Uf);

  // Verificar se o filtro contém apenas o status
  if ('status' in filtros && Object.keys(filtros).length === 1) {
    const ufsEncontradas = await ufRepository.find({
      where: filtros,
    });

    if (!ufsEncontradas || ufsEncontradas.length === 0) {
      return [];
    }

    return ufsEncontradas.map(uf => ({
      codigoUF: uf.codigoUF,
      sigla: uf.sigla,
      nome: uf.nome,
      status: uf.status,
    }));
  }

  const filtroApenasCodigoUFSiglaNome =
    (Object.keys(filtros).length === 1 && 'codigoUF') ||
    'sigla' in filtros ||
    'nome' in filtros;

  if (filtroApenasCodigoUFSiglaNome) {
    const ufEncontrado = await ufRepository.findOne({
      where: filtros,
    });
    if (!ufEncontrado) {
      return [];
    }
    return {
      codigoUF: ufEncontrado.codigoUF,
      sigla: ufEncontrado.sigla,
      nome: ufEncontrado.nome,
      status: ufEncontrado.status,
    };
  }

  const filtroCodigoUFESiglaENome =
    'codigoUF' in filtros && 'sigla' in filtros && 'nome' in filtros;

  // Verificar se o filtro contém o codigoUF, sigla e nome
  if (filtroCodigoUFESiglaENome) {
    const ufEncontrado = await ufRepository.findOne({
      where: {
        codigoUF: filtros.codigoUF,
        sigla: filtros.sigla,
        nome: filtros.nome,
      },
    });

    if (!ufEncontrado) {
      return [];
    }

    return {
      codigoUF: ufEncontrado.codigoUF,
      sigla: ufEncontrado.sigla,
      nome: ufEncontrado.nome,
      status: ufEncontrado.status,
    };
  }
  const ufs = await ufRepository.findBy(filtros);

  if (!ufs || ufs.length === 0) {
    return [];
  }

  return ufs.map(uf => ({
    codigoUF: uf.codigoUF,
    sigla: uf.sigla,
    nome: uf.nome,
    status: uf.status,
  }));
}

export { filtrosUf };
