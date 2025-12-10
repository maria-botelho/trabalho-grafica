import React, { useState } from 'react'; 
import styled from 'styled-components';
import { FaTruck, FaShoppingCart, FaCogs, FaUserCircle, FaAngleDown, FaSignOutAlt } from 'react-icons/fa';

// REMOVIDOS: axios, toast, useEffect, Form, Grid, API_BASE_URL

// --- STYLED COMPONENTS (MANTIDOS) ---

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  h1 {
    color: #000000; /* ⚫ Preta */
    font-weight: 600;
  }
`;

// --- STYLES DO DROP DOWN DE ADMIN ---

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const AdminProfile = styled.div`
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #FFFFFF;
  border: 1px solid #BDBDBD;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 150px;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #f7f9fc;
  }
`;

// --- STYLES DOS CARDS DE ESTATÍSTICAS ---

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const StatsCard = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 120px;
`;

const CardTitle = styled.h3`
    font-size: 1rem;
    color: #666;
    margin-bottom: 15px;
`;

const CardValue = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ValueNumber = styled.span`
    font-size: 2.5rem;
    font-weight: 700;
    color: #1F1F1F;
`;

const CardIcon = styled.div`
    color: #0066CC;
    font-size: 2rem;
`;

const GraphArea = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const GraphCard = styled(StatsCard)`
    padding: 30px;
`;

// REMOVIDOS: PedidosWrapper e PageTitle (Não são usados neste componente)


// --- COMPONENTE PRINCIPAL ---

// 🛑 CORREÇÃO AQUI: Recebendo 'admin' (dados) e 'onLogout' (função)
const DashboardAdmin = ({ admin, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // REMOVIDOS: estados (pedidos, onEdit) e funções (getPedidos, handleEdit, useEffect)

  return (
    <DashboardContainer>
      <Header>
        <h1>Painel Administrativo</h1>
        
        <ProfileWrapper onClick={() => setDropdownOpen(!dropdownOpen)}>
          <AdminProfile>
            <FaUserCircle size={24} style={{ marginRight: '10px', color: '#BDBDBD' }} />
            {/* ✅ CORREÇÃO APLICADA: Usando admin?.nome e a prop 'admin' */}
            <span>{admin?.nome || 'Admin'}</span> 
            <FaAngleDown style={{ marginLeft: '10px' }} />
          </AdminProfile>
          {dropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={() => { /* Navegar para perfil */ }}>
                <FaUserCircle /> Meu Perfil
              </DropdownItem>
              {/* ✅ CORREÇÃO APLICADA: Usando a prop 'onLogout' */}
              <DropdownItem onClick={onLogout}> 
                <FaSignOutAlt /> Sair
              </DropdownItem>
            </DropdownMenu>
          )}
        </ProfileWrapper>
      </Header>

      {/* Cards de Estatísticas (Mantidos) */}
      <CardGrid>
        <StatsCard>
          <CardTitle>Pedidos Realizados</CardTitle>
          <CardValue>
            <ValueNumber>12</ValueNumber>
            <CardIcon><FaShoppingCart /></CardIcon>
          </CardValue>
        </StatsCard>

        <StatsCard>
          <CardTitle>Pedidos em Andamento</CardTitle>
          <CardValue>
            <ValueNumber>6</ValueNumber>
            <CardIcon><FaCogs /></CardIcon>
          </CardValue>
        </StatsCard>

        <StatsCard>
          <CardTitle>Pedidos Entregues</CardTitle>
          <CardValue>
            <ValueNumber>10</ValueNumber>
            <CardIcon><FaTruck /></CardIcon>
          </CardValue>
        </StatsCard>
      </CardGrid>

      {/* REMOVIDO: Toda a seção de Gerenciamento de Pedidos */}

      {/* Área de Gráficos (Mantida) */}
      <GraphArea>
        {/* Card para o Gráfico de Barras/Estatísticas */}
        <GraphCard style={{ backgroundColor: '#1F1F1F' }}>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Statistics</h3>
          <p style={{ color: '#BDBDBD' }}>*Aqui entrará o gráfico de barras*</p>
        </GraphCard>

        {/* Card para o Gráfico de Pizza */}
        <GraphCard>
          <h3 style={{ color: '#1F1F1F', marginBottom: '10px' }}>Visão Geral</h3>
          <p style={{ color: '#666' }}>*Aqui entrará o gráfico de pizza*</p>
        </GraphCard>
      </GraphArea>

    </DashboardContainer>
  );
};

export default DashboardAdmin;