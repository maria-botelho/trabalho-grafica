// src/components/DashboardUser.js (MODIFICADO)
// Assumindo que este é o componente de Dashboard para clientes (usuários comuns)

import React, { useState } from 'react'; 
import { FaUserCircle, FaAngleDown, FaSignOutAlt, FaShoppingCart, FaCogs, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

// 🔑 Reutiliza os estilos de layout do Dashboard Admin (ótima prática!)
import { 
    DashboardContainer,
    Header,
    ProfileWrapper,
    AdminProfile, // Renomeado para UserProfile no componente
    ProfileInfo,
    DropdownMenu,
    Icon,
    CardGrid,
    StatsCard,
    CardTitle,
    CardValue,
    ValueNumber,
    CardIcon,
    GraphArea, // Pode ser útil para gráficos simples de usuário, se necessário
    GraphCard
} from '../styles/dashboard.js'; 


// Renomeando AdminProfile para UserProfile para maior clareza no componente
const UserProfile = AdminProfile; 

// Assumindo que você recebe o objeto user como prop
const DashboardUser = ({ user, onLogout }) => { 
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    // --- SIMULAÇÃO DE DADOS DO USUÁRIO ---
    const pedidosTotal = 5;
    const pedidosEmProducao = 2;
    const pedidosConcluidos = 3;
    
    // Lista de pedidos recentes simulada
    const pedidosRecentes = [
        { id: 101, descricao: 'Cartões de Visita Premium', status: 'Concluído', data: '20/10' },
        { id: 102, descricao: 'Folders Promocionais A4', status: 'Em Produção', data: '25/10' },
        { id: 103, descricao: 'Banner para Evento', status: 'Concluído', data: '01/11' },
    ];
    // ------------------------------------

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/user/logout'); // Assumindo uma rota de logout de usuário
            toast.success("Logout realizado com sucesso.");
            onLogout();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            toast.error("Erro ao sair.");
            onLogout(); 
        }
    };

    return (
        <DashboardContainer>
            {/* --- HEADER --- (Reutilizado) */}
            <Header>
                <h1>Bem-vindo(a), {user?.nome?.split(' ')[0] || 'Cliente'}</h1>
                <ProfileWrapper>
                    <UserProfile onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <ProfileInfo>
                            <span>{user?.nome || 'Cliente Gráfica'}</span>
                            <small>{user?.email || 'cliente@exemplo.com'}</small>
                        </ProfileInfo>
                        <FaUserCircle size={35} style={{ marginRight: '5px', color: '#0066CC' }} />
                        <FaAngleDown size={14} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                    </UserProfile>

                    {dropdownOpen && (
                        <DropdownMenu>
                            <button>
                                <Icon><FaUserCircle /></Icon>
                                Meus Dados
                            </button>
                            <button className="logout-btn" onClick={handleLogout}>
                                <Icon><FaSignOutAlt /></Icon>
                                Sair
                            </button>
                        </DropdownMenu>
                    )}
                </ProfileWrapper>
            </Header>

            {/* --- CARD GRID DE ESTATÍSTICAS (Reutilizado) --- */}
            <CardGrid>
                <StatsCard>
                    <CardTitle>Total de Pedidos</CardTitle>
                    <CardValue>
                        <ValueNumber>{pedidosTotal}</ValueNumber>
                        <CardIcon><FaClipboardList /></CardIcon>
                    </CardValue>
                </StatsCard>

                <StatsCard>
                    <CardTitle>Em Produção</CardTitle>
                    <CardValue>
                        <ValueNumber>{pedidosEmProducao}</ValueNumber>
                        <CardIcon><FaCogs /></CardIcon>
                    </CardValue>
                </StatsCard>

                <StatsCard>
                    <CardTitle>Concluídos</CardTitle>
                    <CardValue>
                        <ValueNumber>{pedidosConcluidos}</ValueNumber>
                        <CardIcon><FaCheckCircle /></CardIcon>
                    </CardValue>
                </StatsCard>
            </CardGrid>

            {/* --- ÁREA DE PEDIDOS RECENTES (Conteúdo Específico do Usuário) --- */}
            <GraphCard> {/* Reutilizando o estilo GraphCard para um painel de lista */}
                <CardTitle style={{fontSize: '1.2rem'}}>Pedidos Recentes</CardTitle>
                <ul>
                    {pedidosRecentes.map(pedido => (
                        <li key={pedido.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>**#{pedido.id}** - {pedido.descricao}</span>
                            <span style={{ 
                                fontWeight: 'bold',
                                color: pedido.status === 'Concluído' ? '#00A859' : '#FF9800' // Verde para concluído, Laranja para produção
                            }}>{pedido.status}</span>
                        </li>
                    ))}
                </ul>
                <button style={{ marginTop: '20px', padding: '10px 15px', border: 'none', background: '#0066CC', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                    Ver Todos os Pedidos
                </button>
            </GraphCard>

        </DashboardContainer>
    );
};

export default DashboardUser;