# Sorteador de Times — Guia para Codex

## Visão Geral

App React + TypeScript para criar times balanceados de futebol. Usa Context API para estado global, localStorage para persistência, Tailwind CSS + Radix UI para interface, e Vite para build.

## Arquitetura & Padrões

### Estrutura de Pastas

```
src/
├── components/              # Componentes UI reutilizáveis (botões, inputs, etc)
├── pages/
│   ├── home.tsx            # Página principal
│   └── components/         # Componentes específicos da página home
├── contexts/               # Context API (PlayersContext)
├── hooks/                  # Custom hooks (usePlayers)
├── mocks/                  # Dados iniciais (playersMock)
├── types/                  # Tipos TypeScript (Player, TeamResult, etc)
├── utils/                  # Funções utilitárias (sorteio, validação)
└── lib/                    # Bibliotecas auxiliares (cn para classes)
```

### Path Aliases

Use `@/` para imports relativos:
```typescript
import { usePlayers } from "@/hooks/usePlayers";
import { sortBalancedTeams } from "@/utils/functions";
import type { Player } from "@/types/player";
```

### Componentes

- **Nomes em PascalCase**: `NewDrawModal`, `PlayersTable`, etc
- **Arquivo `index.tsx`**: Cada componente maior está em pasta com `index.tsx`
- **Componentes funcionais**: Use `React.FC<Props>` ou `function Component()`
- **Props interface**: Declare interface para props quando relevante
- **Sem comentários desnecessários**: Code deve ser auto-explicativo

Exemplo:
```typescript
interface NewPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPlayerModal: React.FC<NewPlayerModalProps> = ({ isOpen, onClose }) => {
  return null;
};
```

### Estado Global com Context

Usar `PlayersContext` para estado compartilhado (matchList, drawHistory, etc):

```typescript
const { matchList, addOrRemoveFromMatchList } = usePlayers();
```

**Convenção**: Funções no context iniciam com verbo (`addOrRemove`, `save`, `clear`).

### localStorage

- **Persistência automática**: useEffect no context sincroniza com localStorage
- **Chaves**: `"matchList"`, `"drawHistory"`, `"tempPlayers"`
- **Inicialização**: Use initializer function no useState para carregar do localStorage

```typescript
const [matchList, setMatchList] = useState<Player[]>(() => {
  const stored = localStorage.getItem("matchList");
  return stored ? JSON.parse(stored) : [];
});
```

### Tipos TypeScript

Centralizar tipos em `src/types/`:
- `Player`: id, name, score, position?
- `TeamResult`: players[], average
- `DrawHistory`: id, date, teams[]
- `PayloadType`: numberOfTeams, numberOfPlayers, matchList

Sempre usar `type` para contracts, não `interface` (exceto para props de componentes).

## Funcionalidades Principais

### Sorteio Inteligente

Função `sortBalancedTeams()` em `src/utils/functions.ts`:
- Testa 10.000 combinações aleatórias
- Calcula diferença de média entre times
- Retorna melhor distribuição

### Validação de Regras

Função `checkRules()` valida:
- Mínimo 2 times
- Jogadores suficientes
- Exatamente a quantidade de jogadores selecionada

Usa `toast` para feedback visual.

## Stack Tecnológico

- **React 19** + **TypeScript 5.8**
- **Tailwind CSS 4** + **Radix UI** (componentes acessíveis)
- **Vite** (dev server + build)
- **React Hook Form** + **Zod** (forms + validação)
- **Sonner** (toasts)
- **Lucide React** (ícones)
- **next-themes** (dark mode)

### Tailwind + Prettier

Config em `prettier.config.cjs` aplica `prettier-plugin-tailwindcss` automaticamente.
Classes Tailwind são organizadas na ordem: layout → sizing → colors → effects.

### ESLint

Usa config `@rocketseat/eslint-config`. Roda com `pnpm lint`.

## Desenvolvimento

### Comandos

```bash
pnpm dev       # Dev server (http://localhost:5173)
pnpm build     # Build para produção
pnpm lint      # Lint com ESLint
pnpm test      # Testes com Vitest
```

### Adicionar um Novo Componente

1. Criar pasta em `src/pages/components/NomeComponente/`
2. Criar `index.tsx` com componente React.FC
3. Declarar interface de Props
4. Exportar default: `export default NomeComponente;`

Exemplo:
```typescript
// src/pages/components/MyFeature/index.tsx
interface MyFeatureProps {
  title: string;
}

const MyFeature: React.FC<MyFeatureProps> = ({ title }) => {
  return <div>{title}</div>;
};

export default MyFeature;
```

### Adicionar um Hook Custom

1. Criar arquivo em `src/hooks/useNome.ts`
2. Exportar função `useNome`
3. Usar com TypeScript strict

```typescript
// src/hooks/usePlayers.ts
import { useContext } from "react";
import { PlayersContext } from "@/contexts/players-context";

export function usePlayers() {
  return useContext(PlayersContext);
}
```

### Adicionar um Tipo

1. Adicionar em `src/types/player.ts` (ou novo arquivo se necessário)
2. Exportar com `export type`

```typescript
export type MyType = {
  id: string;
  name: string;
};
```

### Adicionar uma Função Utilitária

1. Adicionar em `src/utils/functions.ts`
2. Usar tipos TypeScript
3. Validar inputs quando necessário

```typescript
export function myFunction(input: InputType): OutputType {
  // lógica
  return result;
}
```

## Convenções de Commits

Usar conventional commits:

```
feat: descrição da feature
fix: descrição do bug
docs: documentação
refactor: refatoração
test: testes
style: formatação
```

Exemplo:
```
feat: adicionar compartilhamento via WhatsApp
fix: corrigir balanceamento de times
docs: atualizar README
```

## Dicas & Boas Práticas

### Do's ✅

- Type-check tudo com TypeScript strict
- Use path aliases (`@/`) sempre
- Componentes pequenos e focados
- localStorage para dados persistentes
- Context para estado global compartilhado
- Validação de dados com Zod
- Feedback visual com toasts (sonner)
- Dark mode com next-themes (já configurado)

### Don'ts ❌

- Não criar contextos para estado local (use useState)
- Não usar any com TypeScript
- Não comentar código óbvio
- Não fazer queries no componente sem abstrair
- Não misturar Context + Redux (stick com Context)

## Features Planejadas

- [ ] Sortear respeitando posições (ATA/MEI/DEF por time)
- [ ] Rating dinâmico (update scores após jogo)
- [ ] Modo capitão (draft manual)
- [ ] Goleiro obrigatório
- [ ] Fixar jogadores em times
- [ ] Estatísticas de confronto
- [ ] Exportar para PDF/Excel

## Recursos Úteis

- **Radix UI Docs**: https://www.radix-ui.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Hook Form**: https://react-hook-form.com/
- **Zod**: https://zod.dev/
- **Lucide Icons**: https://lucide.dev/

## Notas Importantes

- localStorage está limitado a ~5-10MB por domínio
- Se drawHistory ficar muito grande, considere server-side storage
- Algoritmo de sorteio é O(n*10000) — otimizar se >100 jogadores
- TypeScript strict mode está ativado
- Prettier/ESLint rodam automaticamente com husky (hooks git)
