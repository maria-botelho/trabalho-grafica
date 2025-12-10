// src/styles/dashboard.js (NOVO ARQUIVO)
import styled from 'styled-components';
import { FaSignOutAlt } from 'react-icons/fa'; // Ícones para estilização

// --- CONTAINER GERAL ---
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// --- HEADER ---
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #E5E5E5; /* Cor Secundária */

  h1 {
    color: #000000; /* Preta */
    font-weight: 600;
  }
`;

// --- PROFILE E DROPDOWN ---
export const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const AdminProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ProfileInfo = styled.div`
  margin-right: 10px;
  text-align: right;

  span {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
  }

  small {
    font-size: 0.75rem;
    color: #888;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; /* Posição abaixo do profile */
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 180px;
  margin-top: 5px;

  button {
    width: 100%;
    padding: 10px 15px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    font-size: 0.9rem;
    color: #1F1F1F;

    &:hover {
      background-color: #f0f0f0;
    }

    /* Estilo específico para o botão de Logout */
    &.logout-btn {
      color: #CC0000; /* Vermelho */
      font-weight: 600;
      border-top: 1px solid #eee;
    }
  }
`;

export const Icon = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`;

// --- CARD GRID DE ESTATÍSTICAS ---
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

export const StatsCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  color: #888;
  margin-bottom: 15px;
  font-weight: 500;
`;

export const CardValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ValueNumber = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F1F1F; /* Preta */
`;

export const CardIcon = styled.div`
  font-size: 2rem;
  color: #0066CC; /* Azul Primário */
`;

// --- ÁREA DE GRÁFICOS ---
export const GraphArea = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Um gráfico maior, um menor */
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* Coluna única em telas menores */
  }
`;

export const GraphCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;