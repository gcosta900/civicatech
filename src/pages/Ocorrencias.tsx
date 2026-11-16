import { useEffect, useState, FormEvent } from 'react';
import { ocorrenciaService } from '../services/api';
import { NovaOcorrenciaDTO, Ocorrencia } from '../types/ocorrencia';
import { OcorrenciaCard } from '../components/OcorrenciaCard';

export function Ocorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState<string | null>(null);
  const [filtroBairro, setFiltroBairro] = useState('');

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState<Ocorrencia['categoria']>('BURACO_VIA');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [prioridade, setPrioridade] = useState<Ocorrencia['prioridade']>('MEDIA');

  const [enviando, setEnviando] = useState(false);
  const [erroForm, setErroForm] = useState<string | null>(null);
  const [sucessoForm, setSucessoForm] = useState<string | null>(null);

  async function carregarOcorrencias() {
    setCarregando(true);
    setErroLista(null);
    try {
      const dados = await ocorrenciaService.listarTodas();
      setOcorrencias(dados);
    } catch (err) {
      setErroLista(
        err instanceof Error
          ? err.message
          : 'Não foi possível conectar à API da CivicaTech.'
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarOcorrencias();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErroForm(null);
    setSucessoForm(null);

    if (titulo.trim().length < 5) {
      setErroForm('O título deve ter pelo menos 5 caracteres.');
      return;
    }
    if (bairro.trim().length < 2 || endereco.trim().length < 5) {
      setErroForm('Informe o bairro e o endereço completo da ocorrência.');
      return;
    }
    if (descricao.trim().length < 10) {
      setErroForm('Descreva o problema urbano com pelo menos 10 caracteres.');
      return;
    }

    const novaOcorrencia: NovaOcorrenciaDTO = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria,
      bairro: bairro.trim(),
      endereco: endereco.trim(),
      prioridade,
    };

    setEnviando(true);
    try {
      const criada = await ocorrenciaService.criar(novaOcorrencia);
      setOcorrencias((prev) => [criada, ...prev]);
      setSucessoForm('Ocorrência registrada com sucesso na plataforma!');
      setTitulo('');
      setDescricao('');
      setBairro('');
      setEndereco('');
    } catch (err) {
      setErroForm(
        err instanceof Error ? err.message : 'Falha ao cadastrar ocorrência.'
      );
    } finally {
      setEnviando(false);
    }
  }

  async function handleRemover(id: number) {
    try {
      await ocorrenciaService.remover(id);
      setOcorrencias((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : 'Não foi possível remover a ocorrência.'
      );
    }
  }

  const ocorrenciasFiltradas = ocorrencias.filter((o) =>
    o.bairro.toLowerCase().includes(filtroBairro.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <section>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Painel de Zeladoria Urbana
        </h1>
        <p className="text-slate-600 mt-1">
          Registre problemas no espaço público e acompanhe o andamento em tempo real.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Reportar Problema
          </h2>

          {erroForm && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {erroForm}
            </div>
          )}

          {sucessoForm && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
              {sucessoForm}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Título da Ocorrência *
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Poste apagado na esquina"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Categoria *
                </label>
                <select
                  value={categoria}
                  onChange={(e) =>
                    setCategoria(e.target.value as Ocorrencia['categoria'])
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                >
                  <option value="BURACO_VIA">Buraco na Via</option>
                  <option value="ILUMINACAO">Iluminação Pública</option>
                  <option value="LIXO_ENTULHO">Lixo e Entulho</option>
                  <option value="PODAS_ARVORE">Poda de Árvore</option>
                  <option value="ALAGAMENTO">Ponto de Alagamento</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Prioridade *
                </label>
                <select
                  value={prioridade}
                  onChange={(e) =>
                    setPrioridade(e.target.value as Ocorrencia['prioridade'])
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                >
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Bairro *
              </label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Ex: Bela Vista"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Endereço ou Ponto de Referência *
              </label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Ex: Av. Paulista, 1106"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descrição Detalhada *
              </label>
              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o impacto para os moradores ou pedestres..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              {enviando ? 'Enviando registro...' : 'Registrar Ocorrência'}
            </button>
          </form>
        </section>

        <section className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <input
              type="text"
              value={filtroBairro}
              onChange={(e) => setFiltroBairro(e.target.value)}
              placeholder="Filtrar ocorrências por bairro..."
              className="w-full sm:w-72 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={carregarOcorrencias}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
            >
              &#8635; Atualizar lista
            </button>
          </div>

          {carregando ? (
            <div className="bg-white p-10 rounded-xl border border-slate-200 text-center text-slate-500">
              Carregando ocorrências da API Java...
            </div>
          ) : erroLista ? (
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-red-700">
              <p className="font-semibold">Erro ao carregar dados</p>
              <p className="text-sm mt-1">{erroLista}</p>
            </div>
          ) : ocorrenciasFiltradas.length === 0 ? (
            <div className="bg-white p-10 rounded-xl border border-slate-200 text-center text-slate-500">
              Nenhuma ocorrência encontrada para este filtro.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ocorrenciasFiltradas.map((item) => (
                <OcorrenciaCard
                  key={item.id}
                  ocorrencia={item}
                  onRemover={handleRemover}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
