export interface Atualizacao {
  id: number;
  descricao: string;
  statusNovo: 'ABERTA' | 'EM_ANALISE' | 'RESOLVIDA';
  dataAtualizacao: string;
}

export interface Ocorrencia {
  id: number;
  titulo: string;
  descricao: string;
  categoria: 'ILUMINACAO' | 'BURACO_VIA' | 'LIXO_ENTULHO' | 'PODAS_ARVORE' | 'ALAGAMENTO';
  bairro: string;
  endereco: string;
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA';
  status: 'ABERTA' | 'EM_ANALISE' | 'RESOLVIDA';
  dataAbertura: string;
  atualizacoes?: Atualizacao[];
}

export interface NovaOcorrenciaDTO {
  titulo: string;
  descricao: string;
  categoria: Ocorrencia['categoria'];
  bairro: string;
  endereco: string;
  prioridade: Ocorrencia['prioridade'];
}

export interface NovaAtualizacaoDTO {
  descricao: string;
  statusNovo: Atualizacao['statusNovo'];
}
