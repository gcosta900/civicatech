# CivicaTech — Zeladoria Urbana Colaborativa

## Objetivo
Plataforma CitizenTech desenvolvida para a Global Solution 2026/2 (FIAP) que permite aos cidadãos registrar, priorizar e acompanhar problemas de manutenção em espaços públicos, conectando moradores e gestores urbanos em alinhamento com o ODS 11 da ONU (Cidades e comunidades sustentáveis).

## Tecnologias Utilizadas
- React 18 + Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Fetch API (integração exclusiva sem bibliotecas externas de HTTP)

## Estrutura de Pastas
```text
civicatech/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── IDENTIFICACAO.txt
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── ocorrencia.ts
    ├── services/
    │   └── api.ts
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   └── OcorrenciaCard.tsx
    └── pages/
        ├── Home.tsx
        ├── Ocorrencias.tsx
        ├── OcorrenciaDetalhes.tsx
        ├── Sobre.tsx
        ├── Integrantes.tsx
        ├── Faq.tsx
        └── Contato.tsx
```

## Como Executar Localmente
1. Extraia o arquivo ZIP e acesse a pasta `civicatech` no terminal:
   ```bash
   cd civicatech
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure a URL da API Java criando um arquivo `.env` na raiz (baseado no `.env.example`):
   ```env
   VITE_API_URL=https://civicatech-api.onrender.com
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Links do Projeto
- **Repositório GitHub:** https://github.com/seu-usuario/civicatech
- **Deploy Front-End (Vercel):** https://civicatech.vercel.app
- **API Back-End (Render):** https://civicatech-api.onrender.com
- **Vídeo Demonstração (YouTube):** https://youtu.be/seu-video-aqui

## Integrantes
- **Gustavo Costa Moreira Pinheiro de Almeida** — RM: 573074 — Turma: 1TDSPV

## Contato
contato@civicatech.com.br
