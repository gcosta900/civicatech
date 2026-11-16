import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/ocorrencias', label: 'Ocorrências' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/integrantes', label: 'Integrantes' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contato', label: 'Contato' },
  ];

  return (
    <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded font-extrabold">
              C
            </span>
            <span>CivicaTech</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-300 border-b-2 border-emerald-300 pb-1'
                      : 'text-emerald-100 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuAberto}
            className="md:hidden p-2 rounded-md text-emerald-100 hover:bg-emerald-800 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuAberto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuAberto && (
        <nav className="md:hidden bg-emerald-950 px-4 pt-2 pb-4 space-y-2 border-t border-emerald-800">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-emerald-800 text-white'
                    : 'text-emerald-200 hover:bg-emerald-900 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
