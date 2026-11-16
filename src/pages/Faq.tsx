const perguntas = [
  {
    q: 'Quem pode registrar uma ocorrência na CivicaTech?',
    a: 'Qualquer cidadão pode registrar problemas de infraestrutura urbana como buracos, iluminação precária ou descarte irregular de lixo.',
  },
  {
    q: 'Como acompanho se o problema do meu bairro foi resolvido?',
    a: 'Basta acessar o Painel de Ocorrências e clicar em "Ver detalhes e histórico" para visualizar todas as atualizações de status.',
  },
  {
    q: 'A CivicaTech substitui os canais oficiais da prefeitura?',
    a: 'Ela atua como uma camada colaborativa e transparente que organiza demandas por prioridade e facilita a gestão das equipes locais.',
  },
];

export function Faq() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Perguntas Frequentes (FAQ)</h1>
      <div className="space-y-4">
        {perguntas.map((item, idx) => (
          <details
            key={idx}
            className="bg-white p-5 rounded-xl border border-slate-200 group"
          >
            <summary className="font-bold text-slate-900 cursor-pointer">
              {item.q}
            </summary>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
