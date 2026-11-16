interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  papel: string;
  github: string;
  linkedin: string;
}

const equipe: Integrante[] = [
  {
    nome: 'Gustavo Costa Moreira Pinheiro de Almeida',
    rm: 'RM573074',
    turma: '1TDSPV',
    papel: 'Full Stack & Arquitetura Java / React',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
];

export function Integrantes() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Integrantes do Grupo</h1>
        <p className="text-slate-600 mt-1">
          Equipe responsável pelo desenvolvimento da solução CitizenTech CivicaTech.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipe.map((membro) => (
          <div
            key={membro.rm}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              {membro.nome.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-slate-900">{membro.nome}</h2>
              <p className="text-xs font-semibold text-emerald-700">
                {membro.rm} &bull; {membro.turma}
              </p>
            </div>
            <p className="text-sm text-slate-600">{membro.papel}</p>
            <div className="flex gap-4 pt-2 text-sm font-medium text-emerald-700">
              <a href={membro.github} target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
              <a href={membro.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
