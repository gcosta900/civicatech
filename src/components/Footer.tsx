import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-bold text-white text-lg">CivicaTech</p>
          <p className="text-sm text-slate-400">
            Global Solution 2026/2 &bull; CitizenTech &bull; Alinhado ao ODS 11 da ONU
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/sobre" className="hover:text-emerald-400">Sobre</Link>
          <Link to="/ocorrencias" className="hover:text-emerald-400">Painel Urbano</Link>
          <Link to="/integrantes" className="hover:text-emerald-400">Integrantes</Link>
          <Link to="/faq" className="hover:text-emerald-400">FAQ</Link>
          <Link to="/contato" className="hover:text-emerald-400">Contato</Link>
        </div>
      </div>
    </footer>
  );
}
