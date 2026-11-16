import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Ocorrencias } from './pages/Ocorrencias';
import { OcorrenciaDetalhes } from './pages/OcorrenciaDetalhes';
import { Sobre } from './pages/Sobre';
import { Integrantes } from './pages/Integrantes';
import { Faq } from './pages/Faq';
import { Contato } from './pages/Contato';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/ocorrencias/:id" element={<OcorrenciaDetalhes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
