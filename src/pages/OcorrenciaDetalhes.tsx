import { useEffect, useState, FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ocorrenciaService } from '../services/api';
import { Atualizacao, Ocorrencia } from '../types/ocorrencia';

export function OcorrenciaDetalhes() {
  const { id } = useParams<{ id: string }>();
  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [atualizacoes, setAtualizacoes] = useState<Atualizacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [descricao, setDescricao] = useState('');
  const [statusNovo, setStatusNovo] = useState<Atualizacao['statusNovo']>('EM_ANALISE');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    async function carregarDetalhes() {
      if (!id) return;
      setCarregando(true);
      setErro(null);
      try {
        const [dadosOcorrencia, listaAtualizacoes] = await Promise.all([
          ocorrenciaService.buscarPorId(id),
          ocorrenciaService.listarAtualizacoes(id),
        ]);
        setOcorrencia(dadosOcorrencia);
        setAtualizacoes(listaAtualizacoes);
      } catch (err) {
        setErro(
          err instanceof Error ? err.message : 'Ocorrência não encontrada.'
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarDetalhes();
  }, [id]);

  async function handleAdicionarAtualizacao(e: FormEvent) {
    e.preventDefault();
    if (!id || descricao.trim().length < 5) return;

    setEnviando(true);
    try {
      const nova = await ocorrenciaService.adicionarAtualizacao(id, {
        descricao: descricao.trim(),
        statusNovo,
      });
      setAtualizacoes((prev) => [nova, ...prev]);
      setOcorrencia((prev) => (prev ? { ...prev, status: statusNovo } : prev));
      setDescricao('');
    } catch (err) {
      alert(
        err instanceof Error ? err.message : 'Erro ao registrar atualização.'
      );
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-500">
        Carregando detalhes da ocorrência...
      </div>
    );
  }

  if (erro || !ocorrencia) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {erro || 'Ocorrência não localizada.'}
        </div>
        <Link to="/ocorrencias" className="text-emerald-700 font-semibold">
          &larr; Voltar para ocorrências
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Link
        to="/ocorrencias"
        className="inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-900"
      >
        &larr; Voltar para o painel de ocorrências
      </Link>

      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Protocolo #{ocorrencia.id} &bull; {ocorrencia.categoria.replace('_', ' ')}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {ocorrencia.titulo}
            </h1>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
            Status: {ocorrencia.status.replace('_', ' ')}
          </span>
        </div>

        <p className="text-slate-700 leading-relaxed">{ocorrencia.descricao}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-sm">
          <div>
            <span className="text-slate-400 block">Bairro</span>
            <strong className="text-slate-800">{ocorrencia.bairro}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Endereço</span>
            <strong className="text-slate-800">{ocorrencia.endereco}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Prioridade</span>
            <strong className="text-slate-800">{ocorrencia.prioridade}</strong>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Registrar Andamento
          </h2>
          <form onSubmit={handleAdicionarAtualizacao} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Novo Status
              </label>
              <select
                value={statusNovo}
                onChange={(e) =>
                  setStatusNovo(e.target.value as Atualizacao['statusNovo'])
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="ABERTA">Aberta</option>
                <option value="EM_ANALISE">Em Análise / Equipe Acionada</option>
                <option value="RESOLVIDA">Resolvida</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Parecer ou Atualização *
              </label>
              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Equipe técnica enviada ao local para vistoria..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-4 rounded-lg text-sm"
            >
              {enviando ? 'Salvando...' : 'Adicionar Atualização'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Histórico de Atualizações ({atualizacoes.length})
          </h2>
          {atualizacoes.length === 0 ? (
            <p className="text-sm text-slate-500">
              Nenhuma atualização registrada até o momento.
            </p>
          ) : (
            <ul className="space-y-4">
              {atualizacoes.map((att) => (
                <li
                  key={att.id}
                  className="border-l-4 border-emerald-600 pl-3 py-1 space-y-1"
                >
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="font-bold text-emerald-800">
                      {att.statusNovo.replace('_', ' ')}
                    </span>
                    <span>{att.dataAtualizacao}</span>
                  </div>
                  <p className="text-sm text-slate-700">{att.descricao}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
