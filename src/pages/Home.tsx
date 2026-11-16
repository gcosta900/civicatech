import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <section className="bg-emerald-950 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-emerald-800 text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              CitizenTech &bull; ODS 11
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Cuidando do espaço público junto com quem vive nele.
            </h1>
            <p className="text-emerald-100 text-lg leading-relaxed">
              A <strong>CivicaTech</strong> conecta moradores e gestores públicos para identificar,
              priorizar e resolver problemas de zeladoria urbana com transparência e agilidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/ocorrencias"
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Reportar ou Consultar Ocorrências
              </Link>
              <Link
                to="/sobre"
                className="border border-emerald-400 text-white hover:bg-emerald-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Conhecer o Projeto
              </Link>
            </div>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-emerald-300">Como funciona na prática</h2>
            <ul className="space-y-3 text-sm text-emerald-100">
              <li className="flex gap-3">
                <span className="font-bold text-emerald-400">01.</span>
                <span>O cidadão registra buracos, falhas de iluminação, entulho ou pontos de alagamento.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-emerald-400">02.</span>
                <span>A plataforma organiza prioridades por impacto comunitário e urgência.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-emerald-400">03.</span>
                <span>Cada etapa de manutenção fica visível no protocolo público até a resolução.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
