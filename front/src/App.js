import GlobalStyle from "./styles/global";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import DashboardAdmin from "./components/Dashboard_admin";
import DashboardUser from "./components/Dashboard_user";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// 🔑 Importa os estilos de layout
import {
    PageWrapper,
    Sidebar,
    NavItem,
    ContentArea,
    Container,
    Title
} from './styles/layout.js';

// >>> IMPORTAÇÕES DOS NOVOS COMPONENTES DE AUTENTICAÇÃO ATUALIZADOS <<<
import LoginScreen from "./components/Login";
import RegisterScreen from "./components/Cadastro";
import AdminLoginScreen from "./components/AdminLogin";
import AdminRegisterScreen from "./components/AdminCadastro";
import ForgotPasswordScreen from "./components/RecuperarSenha";

// ✅ IMPORTAÇÕES DOS NOVOS COMPONENTES DE FATURAMENTO
import InvoicingDashboard from "./components/InvoicingDashboard";
import CadastroNotaFiscal from "./components/CadastroNotaFiscal";


// A porta da API de autenticação agora será o padrão
const API_BASE_URL = "http://localhost:3000/api";

// ---------------------------------------------

// --- CONSTANTES PARA GERENCIAMENTO DE TELA ---
const SCREENS = {
    // Telas de Autenticação
    LOGIN: 'login',
    REGISTER: 'register',
    ADMIN_LOGIN: 'admin_login',
    ADMIN_REGISTER: 'admin_register',
    FORGOT_PASSWORD: 'forgot_password',

    // Telas do Painel Admin
    ADMIN_DASHBOARD: 'admin_dashboard',
    ADMIN_PEDIDOS: 'admin_pedidos',
    // ✅ NOVAS TELAS DE FATURAMENTO
    INVOICING_DASHBOARD: 'invoicing_dashboard',
    CADASTRO_NOTA: 'cadastro_nota',

    // Telas do Painel Cliente
    USER_DASHBOARD: 'user_dashboard',
    USER_MEUS_PEDIDOS: 'user_meus_pedidos'
};

// ---------------------------------------------

function App() {
    // Estado do Usuário/Sessão
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null); // Armazena dados do usuário ou admin logado
    const [activeScreen, setActiveScreen] = useState(SCREENS.LOGIN); // Começa sempre na tela de login

    // Estado de Pedidos para o Painel Admin
    const [pedidos, setPedidos] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    // Efeito para carregar o estado da sessão (simulando persistência)
    useEffect(() => {
        // Simulação de verificação de sessão/cookie
        const storedUser = localStorage.getItem('user');
        const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
            setIsAdmin(storedIsAdmin);

            // Define a tela inicial baseada no tipo de usuário
            if (storedIsAdmin) {
                setActiveScreen(SCREENS.ADMIN_DASHBOARD);
            } else {
                setActiveScreen(SCREENS.USER_DASHBOARD);
            }
        }
    }, []);

    // ---------------------------------------------
    // --- LÓGICA DE PEDIDOS (PARA ADMIN) ---
    // ---------------------------------------------

    const getPedidos = async () => {
        if (!isAuthenticated || !isAdmin) return;

        try {
            const res = await axios.get(API_BASE_URL + "/pedidos");
            setPedidos(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
        } catch (error) {
            toast.error("Erro ao carregar pedidos: " + error.message);
        }
    };

    // Carrega pedidos ao entrar no painel de pedidos do admin
    useEffect(() => {
        if (isAuthenticated && isAdmin && activeScreen === SCREENS.ADMIN_PEDIDOS) {
            getPedidos();
        }
    }, [isAuthenticated, isAdmin, activeScreen]);

    // Função para editar um pedido (passada para o Grid)
    const handleEdit = (item) => {
        setOnEdit(item);
        // O formulário de pedidos será exibido na tela 'ADMIN_PEDIDOS'
    };


    // ---------------------------------------------
    // --- LÓGICA DE AUTENTICAÇÃO E NAVEGAÇÃO ---
    // ---------------------------------------------

    const goTo = (screen) => {
        setActiveScreen(screen);
        setOnEdit(null); // Limpa o estado de edição ao mudar de tela
    };

    const handleLogin = (userData, type = 'user') => {
        setUser(userData);
        setIsAuthenticated(true);
        const isAdm = type === 'admin';
        setIsAdmin(isAdm);

        // Persistência simulada
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAdmin', isAdm);

        // Define a tela do painel
        goTo(isAdm ? SCREENS.ADMIN_DASHBOARD : SCREENS.USER_DASHBOARD);
        toast.success(`Login de ${type} realizado com sucesso!`);
    };

    const handleLogout = async () => {
        try {
            // A rota de logout fará a limpeza da sessão no backend
            await axios.post(API_BASE_URL + '/user/logout');

            // Limpa o estado no frontend
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUser(null);
            setOnEdit(null);
            setPedidos([]);

            // Limpa a persistência simulada
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');

            // Redireciona para a tela de login inicial
            goTo(SCREENS.LOGIN);
            toast.info("Sessão encerrada com sucesso.");
        } catch (error) {
            // Se houver erro, ainda assim desloga localmente
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
            goTo(SCREENS.LOGIN);
            toast.error("Erro ao sair. Deslogado localmente.");
        }
    };

    // --- FUNÇÕES DE RENDERIZAÇÃO DE TELA ---

    const renderAuthScreens = () => {
        switch (activeScreen) {
            case SCREENS.LOGIN:
                return <LoginScreen
                    onLogin={(data) => handleLogin(data, 'user')}
                    onGoToRegister={() => goTo(SCREENS.REGISTER)}
                    onGoToAdminLogin={() => goTo(SCREENS.ADMIN_LOGIN)}
                    onGoToForgotPassword={() => goTo(SCREENS.FORGOT_PASSWORD)}
                />;
            case SCREENS.REGISTER:
                return <RegisterScreen
                    onRegisterSuccess={() => goTo(SCREENS.LOGIN)}
                    onGoToLogin={() => goTo(SCREENS.LOGIN)}
                    onGoToAdminRegister={() => goTo(SCREENS.ADMIN_REGISTER)}
                />;
            case SCREENS.ADMIN_LOGIN:
                return <AdminLoginScreen
                    onLogin={(data) => handleLogin(data, 'admin')}
                    onGoToUserLogin={() => goTo(SCREENS.LOGIN)}
                    onGoToAdminRegister={() => goTo(SCREENS.ADMIN_REGISTER)}
                />;
            case SCREENS.ADMIN_REGISTER:
                return <AdminRegisterScreen
                    onRegisterSuccess={() => goTo(SCREENS.ADMIN_LOGIN)}
                    onGoToAdminLogin={() => goTo(SCREENS.ADMIN_LOGIN)}
                    onGoToUserRegister={() => goTo(SCREENS.REGISTER)}
                />;
            case SCREENS.FORGOT_PASSWORD:
                return <ForgotPasswordScreen
                    onGoToLogin={() => goTo(SCREENS.LOGIN)}
                />;
            default:
                return <LoginScreen
                    onLogin={(data) => handleLogin(data, 'user')}
                    onGoToRegister={() => goTo(SCREENS.REGISTER)}
                    onGoToAdminLogin={() => goTo(SCREENS.ADMIN_LOGIN)}
                    onGoToForgotPassword={() => goTo(SCREENS.FORGOT_PASSWORD)}
                />;
        }
    };

    const renderPanelContent = () => {
        if (isAdmin) {
            // Conteúdo para Administrador
            switch (activeScreen) {
                case SCREENS.ADMIN_DASHBOARD:
                    return <DashboardAdmin admin={user} onLogout={handleLogout} />;
                case SCREENS.ADMIN_PEDIDOS:
                    return (
                        <>
                            <Title>Gerenciamento de Pedidos</Title>
                            <Form
                                onEdit={onEdit}
                                setOnEdit={setOnEdit}
                                getPedidos={getPedidos}
                                API_URL={API_BASE_URL}
                            />
                            <Grid
                                pedidos={pedidos}
                                setPedidos={setPedidos}
                                setOnEdit={handleEdit}
                                getPedidos={getPedidos}
                                API_URL={API_BASE_URL}
                            />
                        </>
                    );
                // ✅ NOVOS CASES PARA FATURAMENTO
                case SCREENS.INVOICING_DASHBOARD:
                    // Passa a função goToCadastro para o InvoicingDashboard
                    return <InvoicingDashboard goToCadastro={() => goTo(SCREENS.CADASTRO_NOTA)} />;
                case SCREENS.CADASTRO_NOTA:
                    return <CadastroNotaFiscal 
                        onCadastroSuccess={() => goTo(SCREENS.INVOICING_DASHBOARD)} // Volta para a lista após sucesso
                        onCancel={() => goTo(SCREENS.INVOICING_DASHBOARD)} // Volta para a lista ao cancelar
                    />;
                default:
                    return <DashboardAdmin admin={user} onLogout={handleLogout} />;
            }
        } else {
            // Conteúdo para Usuário/Cliente
            switch (activeScreen) {
                case SCREENS.USER_DASHBOARD:
                    return <DashboardUser user={user} onLogout={handleLogout} />;
                case SCREENS.USER_MEUS_PEDIDOS:
                    // TO-DO: Criar componente de lista de pedidos do usuário
                    return <Title>Meus Pedidos (Lista de Pedidos do Cliente Aqui)</Title>;
                default:
                    return <DashboardUser user={user} onLogout={handleLogout} />;
            }
        }
    };

    const renderSidebar = () => {
        if (isAuthenticated && isAdmin) {
            // Sidebar para Administrador
            return (
                <Sidebar>
                    <h2>Painel Admin</h2>
                    <h3>Geral</h3>
                    <NavItem
                        active={activeScreen === SCREENS.ADMIN_DASHBOARD}
                        onClick={() => goTo(SCREENS.ADMIN_DASHBOARD)}
                    >
                        Dashboard
                    </NavItem>
                    <h3>Gerenciamento</h3>
                    <NavItem
                        active={activeScreen === SCREENS.ADMIN_PEDIDOS}
                        onClick={() => goTo(SCREENS.ADMIN_PEDIDOS)}
                    >
                        Pedidos
                    </NavItem>
                    {/* ✅ NOVO ITEM DE NAVEGAÇÃO */}
                    <NavItem
                        active={activeScreen === SCREENS.INVOICING_DASHBOARD || activeScreen === SCREENS.CADASTRO_NOTA}
                        onClick={() => goTo(SCREENS.INVOICING_DASHBOARD)}
                    >
                        Faturamento
                    </NavItem>
                    {/* Mais itens de navegação para Admin aqui, se necessário */}

                    <NavItem
                        onClick={handleLogout}
                        style={{ marginTop: '30px', color: '#CC0000', fontWeight: 'bold' }}
                    >
                        Sair (Admin)
                    </NavItem>
                </Sidebar>
            );
        }

        if (isAuthenticated && !isAdmin) {
            // Sidebar para Usuário/Cliente
            return (
                <Sidebar>
                    <h2>Olá, {user?.nome || 'Cliente'}</h2>
                    <h3>Minha Conta</h3>
                    <NavItem
                        active={activeScreen === SCREENS.USER_DASHBOARD}
                        onClick={() => goTo(SCREENS.USER_DASHBOARD)}
                    >
                        Início
                    </NavItem>
                    <NavItem
                        active={activeScreen === SCREENS.USER_MEUS_PEDIDOS}
                        onClick={() => goTo(SCREENS.USER_MEUS_PEDIDOS)}
                    >
                        Meus Pedidos
                    </NavItem>

                    <NavItem
                        onClick={handleLogout}
                        style={{ marginTop: '30px', color: '#CC0000', fontWeight: 'bold' }}
                    >
                        Sair (Cliente)
                    </NavItem>
                </Sidebar>
            );
        }

        return null;
    };


    // --- RENDERIZAÇÃO PRINCIPAL ---

    // Se não estiver autenticado, mostra as telas de login/cadastro
    if (!isAuthenticated) {
        return (
            <>
                <Container style={{ paddingTop: '50px' }}>
                    {renderAuthScreens()}
                </Container>
                <GlobalStyle />
                <ToastContainer autoClose={3000} position="top-center" />
            </>
        );
    }

    // Se estiver autenticado, mostra o layout do painel (Sidebar + Conteúdo)
    return (
        <PageWrapper>
            {renderSidebar()}

            <ContentArea>
                <Container>
                    {renderPanelContent()}
                </Container>
            </ContentArea>

            <GlobalStyle />
            <ToastContainer autoClose={3000} position="top-center" />
        </PageWrapper>
    );
}

export default App;