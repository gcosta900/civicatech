import {
  Ocorrencia,
  NovaOcorrenciaDTO,
  Atualizacao,
  NovaAtualizacaoDTO,
} from '../types/ocorrencia';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function tratarResposta<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let mensagemErro = `Erro HTTP ${response.status}`;
    try {
      const erroJson = await response.json();
      mensagemErro = erroJson.mensagem || erroJson.message || mensagemErro;
    } catch {
      // Ignora falha de parse se resposta não tiver JSON
    }
    throw new Error(mensagemErro);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const ocorrenciaService = {
  async listarTodas(): Promise<Ocorrencia[]> {
    const response = await fetch(`${API_BASE_URL}/ocorrencias`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    return tratarResposta<Ocorrencia[]>(response);
  },

  async buscarPorId(id: string): Promise<Ocorrencia> {
    const response = await fetch(`${API_BASE_URL}/ocorrencias/${id}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    return tratarResposta<Ocorrencia>(response);
  },

  async criar(dados: NovaOcorrenciaDTO): Promise<Ocorrencia> {
    const response = await fetch(`${API_BASE_URL}/ocorrencias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dados),
    });
    return tratarResposta<Ocorrencia>(response);
  },

  async listarAtualizacoes(ocorrenciaId: string): Promise<Atualizacao[]> {
    const response = await fetch(
      `${API_BASE_URL}/ocorrencias/${ocorrenciaId}/atualizacoes`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      }
    );
    return tratarResposta<Atualizacao[]>(response);
  },

  async adicionarAtualizacao(
    ocorrenciaId: string,
    dados: NovaAtualizacaoDTO
  ): Promise<Atualizacao> {
    const response = await fetch(
      `${API_BASE_URL}/ocorrencias/${ocorrenciaId}/atualizacoes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(dados),
      }
    );
    return tratarResposta<Atualizacao>(response);
  },

  async remover(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/ocorrencias/${id}`, {
      method: 'DELETE',
    });
    return tratarResposta<void>(response);
  },
};
