export function Sobre() {
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <h1 className="text-3xl font-extrabold text-slate-900">Sobre a CivicaTech</h1>
      <p className="text-slate-700 leading-relaxed">
        Desenvolvida para a Global Solution 2026/2 da FIAP, a plataforma <strong>CivicaTech</strong> nasceu
        da necessidade de aproximar o cidadão dos serviços essenciais de manutenção e zeladoria urbana.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-lg font-bold text-emerald-800 mb-2">Conexão com o ODS 11</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Contribui diretamente para tornar as cidades e comunidades mais inclusivas, seguras,
            resilientes e sustentáveis por meio da participação cívica ativa.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-lg font-bold text-emerald-800 mb-2">Arquitetura Integrada</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Front-end SPA em React e TypeScript integrado a uma API RESTful em Java (Spring Boot + JDBC)
            persistida em banco de dados relacional Oracle.
          </p>
        </div>
      </div>
    </div>
  );
}
