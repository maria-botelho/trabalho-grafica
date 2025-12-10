// src/styles/AuthStyles.js
import styled from 'styled-components';

// ------------------------------------------
// ESTILOS DE AUTENTICAÇÃO
// ------------------------------------------

export const UserBody = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: var(--color-secondary, #E5E5E5);
`;

export const FormCard = styled.div`
  background-color: var(--color-white, #FFFFFF);
  display: flex;
  width: 900px;
  max-width: 95%;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const FormLeft = styled.div`
  flex: 1;
  background-color: var(--color-primary, #1F1F1F);
  color: var(--color-white, #FFFFFF);
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  p {
    font-size: 1rem;
    line-height: 1.5;
    color: #BDBDBD;
  }

  @media (max-width: 768px) {
    display: none; // Esconde o lado esquerdo em telas menores
  }
`;

export const FormRight = styled.div`
  flex: 1;
  padding: 50px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: var(--color-primary, #1F1F1F);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Adiciona espaçamento entre os InputAreas */
  }

  p {
    margin-top: 25px; /* Aumentei a margem para separar da área do formulário */
    font-size: 0.9rem;

    a, span {
      color: var(--color-blue, #0066CC);
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

// ------------------------------------------
// ESTILOS DE FORMULÁRIO (Reutilizados do Form.js e adaptados)
// ------------------------------------------

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  font-size: 1rem;
`;

export const Label = styled.label`
  margin-bottom: 5px; /* Espaço entre Label e Input */
  font-weight: 500;
`;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 6px; /* Ajustei para 6px, padrão usado nos botões de Auth */
  border: none;
  background-color: var(--color-blue, #0066CC);
  color: white;
  height: 42px;
  font-size: 1rem;
  margin-top: 15px; /* Ajuste para ter um respiro maior antes do botão */
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.85;
  }
`;

// ------------------------------------------
// NOVOS ESTILOS PARA LINKS/BOTÕES DE AÇÕES SECUNDÁRIAS
// ------------------------------------------

// 1. Link para Esqueceu a Senha
export const SubtleLink = styled.span`
  color: var(--color-blue, #0066CC);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

// 2. Container para agrupar os botões secundários
export const LinkButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaço entre os botões */
  margin-top: 20px;
  width: 100%;
`;

// 3. Botão Secundário para Cadastro/Login Admin
export const SecondaryButton = styled.button`
  background: var(--color-secundario, #E5E5E5); /* Cinza Claro de fundo */
  color: var(--color-primary, #1F1F1F); /* Preto primário como texto */
  border: 1px solid var(--color-terciaria, #BDBDBD);
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s, border-color 0.2s;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #D6D6D6; /* Um cinza um pouco mais escuro ao passar o mouse */
    border-color: var(--color-primary, #1F1F1F);
  }

  // Permite destacar uma parte do texto dentro do botão
  strong {
      font-weight: 600;
      color: var(--color-primary, #1F1F1F);
  }
`;
// Renomeado de FormContainer para ser específico
export const PedidosFormContainer = styled.form`
  display: flex; /* */
  align-items: flex-end; /* */
  gap: 15px; /* Aumentei o gap para melhor espaçamento */
  flex-wrap: wrap; /* */
  background-color: #fff; /* */
  padding: 20px; /* */
  box-shadow: 0px 0px 5px #ccc; /* */
  border-radius: 5px; /* */
  width: 100%; /* Garante que o Formulário ocupe toda a largura disponível */
`;

// Renomeado de Select para ser específico
export const PedidosSelect = styled.select`
  width: 100%; /* Faz o select preencher o espaço da InputArea */
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;


// ------------------------------------------
// NOVOS ESTILOS PARA O GRID/TABELA DE PEDIDOS (De Grid.js)
// ------------------------------------------

export const TableCard = styled.div`
  background-color: #FFFFFF; /* */
  padding: 20px; /* */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* */
  border-radius: 8px; /* */
  width: 100%; /* */
`;

export const Table = styled.table`
  width: 100%; /* */
  border-collapse: collapse; /* */
`;

export const Thead = styled.thead``; /* */

export const Tbody = styled.tbody``; /* */

export const Tr = styled.tr`
  &:hover {
    background-color: #f7f9fc; /* */
  }
`;

export const Th = styled.th`
  text-align: start; /* */
  border-bottom: 1px solid #BDBDBD; /* Terciária (Cinza Médio) */
  padding: 12px 0; /* */
  color: #000000; /* */
  font-weight: 600; /* */

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"} /* */
  }
`;

export const Td = styled.td`
  padding: 10px 0; /* */
  border-bottom: 1px solid #eee; /* */
  text-align: ${(props) => (props.alignCenter ? "center" : "start")}; /* */
  word-break: break-all; /* */
  color: #1F1F1F; /* Primária (Preto) */

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"} /* */
  }
`;

export const StatusBadge = styled.span`
  display: inline-block; /* */
  padding: 5px 10px; /* */
  border-radius: 15px; /* */
  font-size: 0.75rem; /* */
  font-weight: 600; /* */
  color: white; /* */
  text-align: center; /* */
  /* Lógica de Cores Baseada no Status */
  background-color: ${(props) => {
    switch (props.status) {
      case 'Concluído':
        return '#4CAF50'; // Verde
      case 'Em Andamento':
        return '#FFC107'; // Amarelo/Laranja
      case 'Pendente':
      default:
        return '#F44336'; // Vermelho
    }
  }};
`;

export const ActionsContainer = styled.div`
    display: flex; /* */
    justify-content: center; /* */
    gap: 10px; /* */
`;

export const ActionIcon = styled.div`
  cursor: pointer; /* */
  color: #8D8D8D; /* Cinza Suave */
  transition: color 0.2s; /* */
  font-size: 1.1rem; /* */

  &:hover {
    color: #000000; /* Preto */
  }

  &.trash:hover {
    color: #CC0000; /* Vermelho para Lixo */
  }
`;