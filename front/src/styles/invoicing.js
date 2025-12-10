// src/styles/InvoicingStyles.js

import styled, { css } from 'styled-components';
import { FaEdit, FaTrash, FaMoneyBillWave, FaClock } from 'react-icons/fa';

// --- STYLES GERAIS DE CONTEÚDO ---
export const InvoicingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

export const Title = styled.h2`
  color: #1F1F1F;
  margin-bottom: 20px;
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: 10px;
`;

// --- STYLES DE ESTATÍSTICAS (CARDS) ---
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  h4 {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 5px;
  }

  p {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0066CC; /* Azul Primário */
  }
`;

// --- STYLES DA TABELA ---
export const TableWrapper = styled.div`
  background: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid #E5E5E5;
    font-size: 0.9rem;
    color: #1F1F1F;
    white-space: nowrap; /* Impede quebras desnecessárias */
  }

  th {
    background-color: #F7F7F7;
    font-weight: 600;
    text-transform: uppercase;
    color: #333;
  }
`;

// --- STATUS BADGE (CHAVE DE PADRONIZAÇÃO) ---

const statusColors = {
  paga: '#4CAF50', // Verde
  pendente: '#FFC107', // Amarelo
  cancelada: '#CC0000', // Vermelho
};

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-align: center;
  background-color: ${props => statusColors[props.status.toLowerCase()] || '#BDBDBD'};
`;

// --- BOTÕES ---

const BaseButton = css`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
`;

export const ActionButton = styled.button`
  ${BaseButton}
  
  ${props => props.type === 'edit' && css`
    background: #0066CC; /* Azul Primário */
    color: white;
    &:hover { background: #0056b3; }
  `}
  
  ${props => props.type === 'pay' && css`
    background: #4CAF50; /* Verde */
    color: white;
    &:hover { background: #45a049; }
  `}
  
  ${props => props.type === 'pending' && css`
    background: #FFC107; /* Amarelo */
    color: #1F1F1F;
    &:hover { background: #e0a800; }
  `}
  
  ${props => props.type === 'delete' && css`
    background: #CC0000; /* Vermelho */
    color: white;
    &:hover { background: #b00000; }
  `}
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// --- MODAL (Estilos do modal do EditarNotaModal.js) ---

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #FFFFFF;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.h3`
  font-size: 1.5rem;
  color: #1F1F1F;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E5E5E5;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 5px;
  }

  input, select, textarea {
    padding: 10px;
    border: 1px solid #BDBDBD;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #0066CC;
    }
  }

  textarea {
    resize: vertical;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #E5E5E5;
`;

export const BtnCancel = styled.button`
  ${BaseButton}
  background: #6c757d;
  color: white;
  &:hover { background: #5a6268; }
`;

export const BtnSave = styled.button`
  ${BaseButton}
  background: #0066CC;
  color: white;
  &:hover { background: #0056b3; }
  
  &:disabled {
    background: #BDBDBD;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.p`
    text-align: center;
    padding: 30px;
    color: #666;
    font-size: 1.1rem;
`;