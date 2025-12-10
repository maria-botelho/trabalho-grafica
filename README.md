# Corrigir login, não esta diferenciando user de admin, porem o fluxo esta correto

# Guia de Testes
`Em casos de dúvida entre em contato comigo: Maria Eduarda Botelho`
<p>Olá! Para testar este formulário, você só precisará seguir alguns passos simples. Este aplicativo funciona em duas partes: o Servidor (Backend) e o Site (Frontend). Ambos precisam estar ligados para funcionar.</p>

## Requisito Principais: 
### Instalar o Node.js
  Você precisa ter o Node.js instalado. 
  Ele é o programa que executa o código JavaScript do servidor e do site.
  <ol>
  <li>Se não tiver: Baixe e instale a versão recomendada para o seu sistema operacional no site oficial:</li>
    https://nodejs.org/pt-br/download
  
  <li>Para verificar: Abra o Terminal (ou Prompt de Comando) e digite node -v. Se aparecer um número de versão, está tudo pronto!</li>
  </ol>
  
### Instalar a extensão SQLite Viewer
Com ela será possivel vizualizar o banco de dados que será criado na pasta Backend com o nome pedidos.sqlite

## Passo 1: Preparação do Código
Você precisa instalar os programas que o projeto utiliza (dependencies). Você fará isso em duas etapas:
### Abra o Projeto


- Abra o Terminal ou Prompt de Comando.

Entre na pasta backend usando o comando:

    cd NOME-DA-SUA-PASTA/backend

Execute o comando de instalação:

    npm install
    
### Na pasta Frontend
Ainda no mesmo terminal, navegue agora para a pasta frontend usando o comando:

    cd ../frontend

Execute o comando de instalação:

    npm install

## Passo 2: Ligar o Servidor (Backend)
O servidor é o responsável por salvar e buscar os dados no banco de dados temporário (pedidos.sqlite).

1. Vá para a pasta backend novamente no seu terminal:

        cd ../backend

2. No terminal execute o comndo para ligar o Servidor:
   
        npm start
   
**Observação: O terminal deve mostrar uma mensagem como: "Conectado ao banco de dados SQLite..." e "Servidor rodando na porta 8801".**

Deixe este terminal ABERTO.

## Passo 3: Ligar o Site (Frontend)
Agora, vamos abrir o site no seu navegador.

1. Abra um **NOVO** terminal (mantenha o primeiro rodando no Backend).

2. Vá para a pasta frontend:

        cd NOME-DA-SUA-PASTA/frontend
    
3. No terminal execute o comndo para ligar o Site:

        npm start
   
O navegador deve abrir automaticamente na página do formulário (geralmente em http://localhost:3000).

