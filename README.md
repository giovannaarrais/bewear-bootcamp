# BeWear - E-commerce de Roupas

Um e-commerce moderno e responsivo para venda de roupas, desenvolvido com Next.js 15 e TypeScript.

## 🚀 Tecnologias Utilizadas

### Framework e Linguagem

- **Next.js 15.4.1**
- **React 19.1.0**
- **TypeScript 5**

### Banco de Dados e ORM

- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM 0.44.2** - ORM moderno e type-safe
- **Drizzle Kit** - Ferramentas de migração e schema

### Autenticação e Pagamentos

- **Better Auth 1.2.12** - Solução de autenticação moderna
- **Stripe 18.4.0** - Processamento de pagamentos
- **Google OAuth** - Autenticação social

### UI e Estilização

- **Tailwind CSS 4** - Framework CSS utilitário
- **Shadcn** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos
- **Swiper** - Carrossel de imagens

### Gerenciamento de Estado e Formulários

- **React Hook Form 7.62.0** - Gerenciamento de formulários
- **Zod 4.0.14** - Validação de schemas

### Outras Bibliotecas

- **Sonner** - Notificações toast
- **Next Themes** - Gerenciamento de temas
- **React Number Format** - Formatação de números
- **Class Variance Authority** - Utilitários para classes CSS

## 🛍️ Funcionalidades

### Autenticação

- ✅ Login e registro com email/senha
- ✅ Autenticação social com Google
- ✅ Gerenciamento de sessões
- ✅ Proteção de rotas

### Catálogo de Produtos

- ✅ Listagem de produtos por categoria
- ✅ Página de detalhes do produto
- ✅ Seleção de variantes (cor, tamanho, etc.)
- ✅ Sistema de categorias
- ✅ Busca e filtros

### Carrinho de Compras

- ✅ Adicionar produtos ao carrinho
- ✅ Remover produtos do carrinho
- ✅ Atualizar quantidades
- ✅ Persistência do carrinho
- ✅ Cálculo automático de totais

### Checkout e Pagamentos

- ✅ Integração completa com Stripe
- ✅ Processamento seguro de pagamentos
- ✅ Webhooks para confirmação de pagamento
- ✅ Página de sucesso e cancelamento
- ✅ Gerenciamento de endereços de entrega

### Gestão de Pedidos

- ✅ Histórico de pedidos
- ✅ Status de pagamento
- ✅ Limpeza automática do carrinho após pagamento

### Interface do Usuário

- ✅ Design responsivo (mobile-first)
- ✅ Componentes reutilizáveis
- ✅ Navegação intuitiva
- ✅ Loading states e feedback visual
- ✅ Notificações toast

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint

# Banco de dados
npm run db:generate    # Gerar migrações
npm run db:migrate     # Executar migrações
npm run db:push        # Push do schema para o banco
npm run db:seed        # Popular banco com dados iniciais
```

## 🌐 Rotas da Aplicação

### Páginas Públicas

- **GET** `/` - Página inicial com catálogo de produtos
- **GET** `/authentication` - Login e registro de usuários
- **GET** `/category/[slug]` - Produtos por categoria
- **GET** `/product-variant/[slug]` - Detalhes do produto

### Carrinho e Checkout

- **GET** `/cart/identification` - Identificação e endereços
- **GET** `/cart/confirmation` - Confirmação do pedido
- **GET** `/checkout/success` - Página de sucesso do pagamento
- **GET** `/checkout/cancel` - Página de cancelamento
- **GET** `/checkout/my-orders` - Histórico de pedidos do usuário

### API Routes

#### Autenticação

- **GET/POST** `/api/auth/[...all]` - Handlers do Better Auth (login, logout, registro, OAuth)

#### Stripe

- **POST** `/api/stripe/webhook` - Webhook para confirmação de pagamentos

### Server Actions

#### Carrinho

- `addCartProduct` - Adicionar produto ao carrinho
- `removeCartProduct` - Remover produto do carrinho
- `decreaseCartProductQuantity` - Diminuir quantidade
- `getCart` - Buscar carrinho do usuário

#### Endereços

- `createShippingAddress` - Criar endereço de entrega
- `getUserAddresses` - Buscar endereços do usuário
- `removeAddress` - Remover endereço
- `updateCartShippingAddress` - Atualizar endereço do carrinho

#### Pedidos e Pagamentos

- `createCheckoutSession` - Criar sessão de pagamento Stripe
- `finishOrder` - Finalizar pedido

## 📦 Estrutura do Projeto

```
src/
├── actions/              # Server Actions
├── app/                  # App Router (Next.js 15)
│   ├── api/             # API Routes
│   ├── authentication/  # Páginas de autenticação
│   ├── cart/           # Fluxo do carrinho
│   ├── category/       # Páginas de categoria
│   ├── checkout/       # Fluxo de checkout
│   └── product-variant/ # Páginas de produto
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes comuns
│   └── ui/            # Componentes de UI
├── data/               # Funções de busca de dados
├── db/                 # Configuração do banco
├── helpers/            # Funções auxiliares
├── hooks/              # Custom hooks
├── lib/                # Configurações e utilitários
└── providers/          # Providers React
```

## 🔧 Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente (veja `.env.example`)
4. Execute as migrações: `npm run db:migrate`
5. Popule o banco: `npm run db:seed`
6. Inicie o servidor: `npm run dev`

## 📝 Próximos Passos

- [ ] Implementar sistema de avaliações
- [ ] Adicionar mais métodos de pagamento
- [ ] Sistema de cupons de desconto
- [ ] Wishlist/favoritos
- [ ] Notificações por email
- [ ] Dashboard administrativo
- [ ] PWA (Progressive Web App)

---

Desenvolvido com ❤️ usando as mais modernas tecnologias do ecossistema React/Next.js
