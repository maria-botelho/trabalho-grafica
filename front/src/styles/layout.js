// src/styles/layout.js (NOVO ARQUIVO)
import styled from "styled-components";

// --- STYLES PARA O LAYOUT DE PAINEL ---

export const PageWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
`;

export const Sidebar = styled.nav`
    width: 250px;
    background-color: #1F1F1F; /* Preto Primário */
    color: #FFFFFF;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    flex-shrink: 0; /* Impede que a sidebar encolha */
    
    h2 { margin-bottom: 20px; font-size: 20px; }
    h3 { color: #BDBDBD; font-size: 16px; margin-top: 20px; }
`;

export const NavItem = styled.a`
    display: block;
    color: ${(props) => (props.active ? '#0066CC' : '#FFFFFF')}; /* Azul Primário para ativo */
    background-color: ${(props) => (props.active ? '#333333' : 'transparent')};
    text-decoration: none;
    padding: 8px 10px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
        background-color: #333333;
        color: ${(props) => (props.active ? '#0066CC' : '#E5E5E5')};
    }
`;

export const ContentArea = styled.main`
    flex: 1;
    padding: 20px;
    background-color: #E5E5E5; /* Cinza Secundário */
    overflow-y: auto; /* Garante scroll se o conteúdo for grande */
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1200px; 
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.h2`
    color: #000000;
    font-weight: 600;
    padding-bottom: 5px;
`;