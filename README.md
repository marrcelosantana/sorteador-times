# ⚽ Sorteador de Times

Um app moderno e intuitivo para criar times balanceados de forma inteligente. Perfeito para organizar peladas, futebol de amigos e campeonatos casuais.

## 🚀 Features

- **🎯 Sorteio Inteligente** — Algoritmo que testa 10.000 combinações para encontrar a melhor distribuição de jogadores, garantindo times equilibrados
- **👥 Gerenciador de Jogadores** — Cadastre jogadores com score (nível) e posição (Atacante, Meio-campo, Defesa)
- **➕ Jogadores Temporários** — Adicione jogadores sem salvar permanentemente, ideal para peladas pontuais
- **📊 Histórico de Sorteios** — Consulte todos os sorteios realizados com data, hora e composição dos times
- **📱 Compartilhar no WhatsApp** — Envie o resultado para o grupo direto no WhatsApp
- **🌓 Dark Mode** — Tema escuro/claro para melhor experiência visual
- **💾 Sincronização Local** — Todos os dados são salvos no localStorage do navegador
- **📋 Copiar Lista** — Copie a lista de times para a área de transferência

## 🛠️ Tech Stack

- **React 19** — Framework UI
- **TypeScript** — Type safety
- **Tailwind CSS** — Estilização
- **Radix UI** — Componentes acessíveis
- **Vite** — Build tool rápido
- **React Hook Form** — Gerenciamento de formulários
- **Zod** — Validação de dados
- **Vitest** — Testes unitários
- **Lucide React** — Ícones

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/marrcelosantana/sorteador-times.git
cd sorteador-times

# Instale as dependências
pnpm install
# ou
npm install
# ou
yarn install
```

## 🎮 Como Usar

### Desenvolvimento

```bash
pnpm dev
```

Abre o app em `http://localhost:5173`

### Build para Produção

```bash
pnpm build
```

### Testes

```bash
pnpm test
```

### Lint

```bash
pnpm lint
```

## 💡 Como Funciona

### Sorteio Balanceado

O app implementa um algoritmo inteligente de distribuição:

1. **Seleção de Jogadores** — Escolha quantos jogadores e quantos times
2. **Algoritmo de Tentativas** — Testa 10.000 combinações aleatórias
3. **Cálculo de Diferença** — Para cada combinação, calcula a diferença de média entre o melhor e pior time
4. **Melhor Resultado** — Retorna a combinação com a menor diferença

Isso garante times muito mais equilibrados do que um sorteio aleatório simples!

### Exemplo

Se você tem 12 jogadores com scores variados e quer formar 3 times de 4 jogadores cada, o app vai testar 10.000 formas diferentes de dividir esses jogadores até encontrar a distribuição mais equilibrada.

## 📖 Estrutura do Projeto

```
src/
├── components/          # Componentes UI reutilizáveis
├── pages/              # Páginas e componentes maiores
│   └── components/     # Componentes da página home
├── contexts/           # Context API para estado global
├── hooks/              # Custom hooks
├── mocks/              # Dados iniciais de exemplo
├── types/              # Tipos TypeScript
├── utils/              # Funções utilitárias
└── lib/                # Bibliotecas auxiliares
```

## 🎯 Roadmap

- [ ] Sortear por posição (garantir distribuição de posições por time)
- [ ] Rating dinâmico (atualizar scores após resultado do jogo)
- [ ] Modo capitão (draft manual entre capitães)
- [ ] Goleiro obrigatório
- [ ] Fixar jogadores em times
- [ ] Estatísticas de confronto
- [ ] Exportar para PDF/Excel

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou PR com suas sugestões e melhorias.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ⚽ por [Marcelo Santana](https://github.com/marrcelosantana)
