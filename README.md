# TaskFlowProject 🚀

O **TaskFlowProject** é um gerenciador de projetos moderno, estilo Kanban, projetado para ajudar equipes a organizar, visualizar e filtrar tarefas de forma eficiente. Construído com uma arquitetura de **monorepo** escalável, o projeto utiliza um quadro de arrastar e soltar intuitivo para facilitar o acompanhamento do progresso e a colaboração.

---

## 🎨 Referência Visual

O design da interface do usuário foi cuidadosamente planejado para oferecer uma experiência premium e moderna. Você pode consultar o protótipo completo no Figma:

> [**Acessar Design no Figma**](https://www.figma.com/design/o6JGK68WYfHQeu3Bfsrt2D/gerenciador-de-projetos?node-id=0-1&p=f&t=4Ec3ltc5tn4697c8-0)

---

## 🏗️ Arquitetura do Monorepo

O repositório utiliza **pnpm workspaces** para gerenciar de forma centralizada as diferentes partes do projeto, garantindo modularidade e reutilização de código.

```text
/TaskFlowProject
├── apps/
│   └── web/         # Aplicação principal em React
├── packages/
│   ├── domain/      # Lógica de negócio e regras de domínio
│   ├── types/       # Definições de tipos compartilhados
│   └── utils/       # Funções utilitárias
├── package.json
└── pnpm-workspace.yaml
```

| Diretório | Tipo | Descrição |
| :--- | :--- | :--- |
| `apps/web` | Aplicação | Interface web principal construída com React, Vite e TypeScript. |
| `packages/domain` | Pacote | Lógica de negócio central e regras de domínio da aplicação. |
| `packages/types` | Pacote | Centraliza as definições de tipos TypeScript para garantir consistência. |
| `packages/utils` | Pacote | Fornece funções e utilitários reutilizáveis em todo o projeto. |

---

## 🛠️ Stack Tecnológica

- **Frontend:** [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Gerenciamento de Estado:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Testes:** [Jest](https://jestjs.io/)
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)

---

## ⚠️ Limitações Atuais

Atualmente, o projeto está otimizado exclusivamente para uso em **Desktop**. Ainda assim, a interface já possui suporte para dispositivos móveis (responsividade mobile).

---

## 🚀 Próximos Passos

O desenvolvimento do TaskFlowProject é contínuo, e a seguinte melhoria está planejada para as próximas versões:

**📱 App Mobile:** Implementação de um aplicativo adaptado com interações touch em smartphones e tablets.

---


## 🚀 Como Começar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [pnpm](https://pnpm.io/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Mr99880371/TaskFlowProject.git
    cd TaskFlowProject
    ```

2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

3.  **Prepare os pacotes compartilhados:**
    É necessário compilar o pacote de tipos antes de iniciar a aplicação ou rodar os testes:
    ```bash
    pnpm --filter @taskflow/types build
    ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento da aplicação web:
```bash
pnpm --filter web dev
```
A aplicação estará disponível em `http://localhost:5173`.

---

## 🧪 Executando Testes

O projeto utiliza Jest para testes unitários, especialmente no pacote de domínio.

### Passo a Passo para Testes

1.  **Compile o pacote de tipos** (necessário para as declarações de tipos nos testes):
    ```bash
    cd packages/types
    pnpm build
    ```

2.  **Execute os testes no pacote de domínio**:
    ```bash
    cd ../domain
    pnpm test
    ```

### Atalho via Raiz

Você também pode executar os testes diretamente da raiz do projeto:
```bash
pnpm --filter @taskflow/types build && pnpm --filter @taskflow/domain test
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `pnpm dev` | Inicia o servidor de desenvolvimento. |
| `pnpm build` | Compila o projeto para produção. |
| `pnpm test` | Executa os testes unitários em todo o monorepo. |
| `pnpm lint` | Analisa o código em busca de erros de estilo. |

---

## 📄 Crédito

Desenvolvido por [Mariane Araujo Justino](https://github.com/Mr99880371)

