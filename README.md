# 🚀 Vivere Backend API

## 📖 Descrição

API do sistema Vivere, responsável pela gestão de usuários, eventos e carrinhos de compra. Desenvolvida com Node.js e Prisma para integração com PostgreSQL.

---

## 🛠️ Tecnologias Principais

- **Node.js** (v18+) - Ambiente de execução JavaScript
- **Express** - Framework web para API RESTful
- **Prisma** - ORM para PostgreSQL
- **JWT** - Autenticação segura
- **Swagger** - Documentação de API
- **Docker** - Containerização do serviço

---

## 🖥️ Repositório do Front-End

A interface do usuário do projeto está disponível em:  
🔗 [vivereTeam/vivere-front](https://github.com/vivereTeam/vivere-front)

---

## 📂 Estrutura do Projeto

```plaintext
vivereteam-vivere-back/
├── prisma/
│   ├── schema.prisma
│   └── migrations/ (6 migrações)
├── src/
│   ├── controllers/ (cart, evento, user)
│   ├── middleware/ (auth, roles)
│   ├── routes/ (cart, evento, user)
│   ├── server.js
│   └── server.test.js
├── docker-compose.yml
├── Dockerfile
└── swagger-output.json
```

---

## 🔧 Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente ou com Docker.

### **Requisitos Prévios**
- Node.js (v16 ou superior)
- Docker e Docker Compose (opcional)
- PostgreSQL (somente para execução local, caso não use Docker)

---

## 💻 Executar com Docker (Recomendado)

### 1. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/mydatabase
JWT_SECRET=sua_chave_jwt_segura
```

### 2. Inicie o projeto com Docker

```bash
docker-compose up --build
```

---

## 🛠️ Executar Localmente

### 1. Clone o Repositório

```bash
git clone https://github.com/vivereTeam/vivere-back
cd vivere-back
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Arquivo `.env`

Crie um arquivo `.env` com as seguintes variáveis:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_jwt_segura
```

> **Atenção:**  
> - Você precisa ter o **PostgreSQL instalado e rodando localmente**, ou usar um banco externo.  
> - Use as credenciais do seu ambiente (usuário, senha, host, nome do banco etc).

### 4. Execute as Migrações

```bash
npx prisma migrate dev
```

### 5. Inicie o Projeto

```bash
npm run dev
```

---

## 📚 Documentação da API

- Swagger disponível em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🤝 Contribuição

1. Crie uma branch:
   ```bash
   git checkout -b feature/NomeDaFeature
   ```
2. Faça o commit:
   ```bash
   git commit -m 'feat: adiciona NomeDaFeature'
   ```
3. Envie a branch:
   ```bash
   git push origin feature/NomeDaFeature
   ```
4. Abra um Pull Request com uma descrição clara

---

## 📜 Licença

MIT License – Consulte o arquivo `LICENSE`.

---

## 👥 Colaboradores

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/J0aoPaulo">
          <img src="https://avatars.githubusercontent.com/u/98539735?v=4" width="100;" alt="J0aoPaulo"/>
          <br />
          <sub><b>João Paulo Almeida</b></sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/DavidEricson00">
          <img src="https://avatars.githubusercontent.com/u/169815129?v=4" width="100;" alt="DavidEricson00"/>
          <br />
          <sub><b>David Ericson</b></sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>
