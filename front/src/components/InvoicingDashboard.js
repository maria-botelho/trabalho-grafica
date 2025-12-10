// src/components/InvoicingDashboard.js

import React from 'react'; 
import NotasFiscaisList from './NotasFiscaisList';
import { InvoicingContainer, ActionsContainer, ActionButton } from '../styles/invoicing';
import { FaPlusCircle } from 'react-icons/fa';

// O componente agora recebe a função de navegação do App.js
const InvoicingDashboard = ({ goToCadastro }) => { 
    return (
        <InvoicingContainer>
            {/* Botão de Ação no topo */}
            <ActionsContainer style={{ justifyContent: 'flex-end', paddingBottom: '10px' }}>
                <ActionButton
                    type="edit" // Usando o estilo azul para "edit"
                    onClick={goToCadastro}
                >
                    <FaPlusCircle /> Nova Nota Fiscal
                </ActionButton>
            </ActionsContainer>
            
            <NotasFiscaisList />
        </InvoicingContainer>
    );
};

export default InvoicingDashboard;