
# 🌟 Vivere Back-End

## 📖 Descrição

O **Vivere Back-End** é a parte servidor de uma plataforma inovadora de e-commerce focada na criação, gestão e compartilhamento de experiências únicas, indo além da simples venda de ingressos para eventos.

---

## 🚀 Funcionalidades Principais

### 📌 Gestão de Experiências
- **Criação e administração** de experiências personalizadas para usuários.

### 💳 Integração com Pagamentos
- **Processamento seguro** e eficiente de transações financeiras.

### 🔐 Autenticação e Autorização
- **Gerenciamento de usuários** com diferentes níveis de acesso e segurança.

### 🌐 API RESTful
- **Endpoints robustos** para interação eficiente com front-end e outros serviços.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** 🚦 Ambiente de execução para JavaScript.
- **Express.js** 🌉 Framework web para APIs robustas.
- **Prisma** 📚 ORM moderno para banco de dados.
- **Swagger** 📃 Documentação e testes da API.

---

## 📂 Estrutura do Projeto

```plaintext
📁 vivere-back
├── 📂 prisma
│   └── schema.prisma
└── 📂 src
    ├── 📂 controllers
    ├── 📂 models
    ├── 📂 routes
    ├── 📂 services
    └── 📂 utils
```

---

## 🔧 Instalação e Configuração

### 📌 Requisitos Prévios
- Node.js (v16 ou superior)
- npm

### 📌 Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/vivereTeam/vivere-back.git
   cd vivere-back
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```env
   DATABASE_URL="url_do_banco_de_dados"
   PORT=3000
   JWT_SECRET="sua_chave_secreta"
   ```

4. **Execute migrações do banco de dados**
   ```bash
   npx prisma migrate dev
   ```

---

## ▶️ Uso

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Acesse o projeto em:

```
http://localhost:3000
```

---

## 📑 Documentação da API

A documentação da API pode ser acessada via Swagger:

```
http://localhost:3000/api-docs
```

---

## 🤝 Como Contribuir

1. Faça um **fork** do repositório
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFuncionalidade'`)
4. Push para sua branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.

---

## 📩 Contato

Visite o repositório no GitHub: [vivereTeam/vivere-back](https://github.com/vivereTeam/vivere-back)

