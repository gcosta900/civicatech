import { Link } from 'react-router-dom';
import { Ocorrencia } from '../types/ocorrencia';

interface OcorrenciaCardProps {
  ocorrencia: Ocorrencia;
  onRemover?: (id: number) => void;
}

const coresStatus: Record<Ocorrencia['status'], string> = {
  ABERTA: 'bg-amber-100 text-amber-800 border-amber-300',
  EM_ANALISE: 'bg-blue-100 text-blue-800 border-blue-300',
  RESOLVIDA: 'bg-emerald-100 text-emerald-800 border-emerald-300',
};

const coresPrioridade: Record<Ocorrencia['prioridade'], string> = {
  BAIXA: 'text-slate-600 bg-slate-100',
  MEDIA: 'text-orange-700 bg-orange-100',
  ALTA: 'text-red-700 bg-red-100',
};

export function OcorrenciaCard({ ocorrencia, onRemover }: OcorrenciaCardProps) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              coresStatus[ocorrencia.status]
            }`}
          >
            {ocorrencia.status.replace('_', ' ')}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded ${
              coresPrioridade[ocorrencia.prioridade]
            }`}
          >
            Prioridade {ocorrencia.prioridade}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">{ocorrencia.titulo}</h3>
        <p className="text-xs font-medium text-emerald-700 mb-2">
          {ocorrencia.categoria.replace('_', ' ')} &bull; Bairro: {ocorrencia.bairro}
        </p>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4">{ocorrencia.descricao}</p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/ocorrencias/${ocorrencia.id}`}
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          Ver detalhes e histórico &rarr;
        </Link>

        {onRemover && (
          <button
            type="button"
            onClick={() => onRemover(ocorrencia.id)}
            className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50"
          >
            Excluir
          </button>
        )}
      </div>
    </article>
  );
}
