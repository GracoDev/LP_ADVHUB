# AdvHub Landing

Landing page do CRM de IA para advogados - Next.js, TypeScript e Tailwind CSS.

## Pré-requisitos

Antes de começar, instale no seu PC:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v18 ou superior recomendado, inclui npm)

## Abrindo o projeto em outro PC (Git)

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO> nome-da-pasta
```

Exemplo, se o repositório estiver no GitHub:

```bash
git clone https://github.com/seu-usuario/LP_ADVHUB.git LP_ADVHUB
```

### 2. Entrar na pasta do projeto

```bash
cd LP_ADVHUB
```

> Se o clone criou a pasta em `LP_ADVHUB/LP_ADVHUB`, use: `cd LP_ADVHUB/LP_ADVHUB`

### 3. Instalar as dependências

```bash
npm install
```

### 4. Rodar o projeto em desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## Setup (projeto já clonado)

Se você já tem o projeto localmente:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura

```
/app
  layout.tsx    # Layout raiz
  page.tsx      # Página inicial (seções)

/components
  Hero.tsx
  Problem.tsx
  Solution.tsx
  HowItWorks.tsx
  Benefits.tsx
  Testimonials.tsx
  FinalCTA.tsx
```

## Scripts

- `npm run dev` - Desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Rodar build de produção
- `npm run lint` - Verificar código
