# 🔗 ELO CRM

> **Conectando Pessoas e Oportunidades**

![Elo CRM Logo](https://ik.imagekit.io/lefcc/ELO%20CRM/elo_logo.png)

## 📖 Sobre o Projeto

O **Elo CRM** é uma solução desenvolvida para otimizar e centralizar o gerenciamento de clientes e o ciclo de vendas, com foco especial em corretores e seguradoras.

Nosso objetivo é resolver dores comuns do mercado, como a indefinição de lucro por produto, a perda de leads por cotações expiradas e a ineficiência na rastreabilidade de dados. Com o Elo CRM, transformamos potencial em lucro, garantindo que nenhuma oportunidade seja perdida.
<p align="center">
  <img src="https://ik.imagekit.io/5vd9mfrfv/EloCRM/vers%C3%A3o1_ELOCRM.jpg" width="45%" />
  <img src="" width="45%" />
</p>

<p align="center">
  <img src="img3.png" width="45%" />
  <img src="img4.png" width="45%" />
</p>
<p align="center">
  <img src="img3.png" width="45%" />
  <img src="img4.png" width="45%" />
</p>
<p align="center">
  <img src="img3.png" width="45%" />
  <img src="img4.png" width="45%" />
</p>
<p align="center">
  <img src="img3.png" width="45%" />
  <img src="img4.png" width="45%" />
</p>
<p align="center">
  <img src="img3.png" width="45%" />
  <img src="img4.png" width="45%" />
</p>

### 🚀 Diferenciais e Proposta de Valor

* **Gestão Completa de Oportunidades:** Visualize e gerencie o funil de vendas de forma intuitiva.
* **Controle Financeiro Preciso:** Saiba exatamente a rentabilidade de cada negócio.
* **Rastreabilidade Automática:** Histórico claro das interações e status.
* **Segurança e Acessibilidade:** Dados protegidos e acesso facilitado.
* **Visão de Futuro:** Preparado para integrar módulos ESG (Environmental, Social, and Governance).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando uma arquitetura moderna, separando o Backend do Frontend.

### Backend (API)
* **Linguagem:** Java 17+
* **Framework:** Spring Boot 3
* **Banco de Dados:** MySQL
* **ORM:** JPA / Hibernate
* **Segurança:** Spring Security (Token JWT)

### Frontend (Interface)
* **Linguagem:** TypeScript / JavaScript
* **Framework:** React
* **Estilização:** Tailwind CSS
* **Ferramentas:** Vite, Insomnia, Figma
* **Bibliotecas Principais:**
  * `react-router-dom` (Rotas e Navegação)
  * `axios` (Integração com API)
  * `reactjs-popup` (Modais)
  * `react-toastify` (Notificações)
  * `react-spinners` (Feedbacks de carregamento)

---

## 👥 O Time (Mulheres em Tech)

Projeto desenvolvido por um time de especialistas em desenvolvimento Fullstack Java:

* **Ana Lemos**
* **Jéssica Tinguely**
* **Letícia Campos**
* **Nádia Caricatto**
* **Thalita Lima**

---

## 💻 Como Executar o Frontend Localmente

Para testar a aplicação, você não precisa configurar o ambiente Java/Banco de Dados. O Frontend local se conectará automaticamente à nossa API hospedada na nuvem.

### Pré-requisitos
* Node.js e NPM instalados.
* Git.

### Passo a Passo

1. **Clone o repositório:**
  ```bash
  git clone https://github.com/MavenTech83/ELO-CRM_FrontEnd.git
  ```

2. **Acesse a pasta do projeto:**
  ```bash
  cd ELO-CRM_FrontEnd
  ```

3. **Instale as dependências:**
  ```bash
  npm install
  ```

4. **Configure a conexão com a API:** 

Crie um arquivo chamado ```.env``` na raiz da pasta do frontend. Insira a URL da nossa API hospedada no Render:
  ```bash
  VITE_API_URL="https://elo-crm.onrender.com"
  ```

5. **Execute o projeto:**
  ```Snippet de código
  npm run dev
  ```

6. **Acesse no navegador:**
O projeto estará rodando em: http://localhost:5173



Nota: Como o Backend está hospedado em um serviço gratuito (Render), a primeira requisição pode levar cerca de 1 minuto para "acordar" o servidor. Se o login demorar na primeira tentativa, aguarde um instante e tente novamente.

🌐 Deploy (Acesso Online)

- Backend (API): [Elo CRM - BackEnd](https://elo-crm.onrender.com/)
- Frontend (Interface): [Elo CRM - FrontEnd](elo-crm-front-end.vercel.app)
