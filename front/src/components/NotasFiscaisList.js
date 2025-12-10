// src/components/NotasFiscaisList.js

import React, { useState, useEffect } from 'react';
import { 
    getNotasFiscais, 
    getFaturamento, 
    updateNotaFiscal, 
    deleteNotaFiscal 
} from '../services/invoicingApi';
import EditarNotaModal from './EditarNotaModal';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaMoneyBillWave, FaClock } from 'react-icons/fa';

// Importa os estilos padronizados
import { 
    Title, 
    StatsGrid, 
    StatCard, 
    TableWrapper, 
    Table, 
    StatusBadge, 
    ActionsContainer, 
    ActionButton,
    EmptyState
} from '../styles/invoicing'; 


const NotasFiscaisList = () => {
  const [notasFiscais, setNotasFiscais] = useState([]);
  const [faturamento, setFaturamento] = useState({});
  const [loading, setLoading] = useState(true);
  const [notaEditando, setNotaEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      const [notasData, faturamentoData] = await Promise.all([
        getNotasFiscais(),
        getFaturamento()
      ]);
      
      setNotasFiscais(notasData);
      setFaturamento(faturamentoData);
    } catch (error) {
      toast.error(' Erro ao carregar dados de Notas Fiscais.');
      console.error(' Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const abrirModalEdicao = (nota) => {
    setNotaEditando(nota);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNotaEditando(null);
  };

  const handleAtualizarNota = () => {
    carregarDados();
  };
  
  const handleMudarStatus = async (nota, novoStatus) => {
    if (!window.confirm(`Tem certeza que deseja mudar o status da NF ${nota.numero} para ${novoStatus}?`)) {
      return;
    }
    try {
      await updateNotaFiscal(nota.id, { status: novoStatus });
      toast.success(`Status da NF ${nota.numero} atualizado para ${novoStatus.toUpperCase()}!`);
      carregarDados();
    } catch (error) {
      toast.error('Erro ao mudar o status da nota.');
      console.error('Erro ao mudar status:', error);
    }
  };
  
  const handleDeletarNota = async (id, numero) => {
    if (!window.confirm(`Tem certeza que deseja DELETAR permanentemente a NF ${numero}?`)) {
      return;
    }
    try {
      await deleteNotaFiscal(id);
      toast.success(`Nota Fiscal ${numero} deletada com sucesso.`);
      carregarDados();
    } catch (error) {
      toast.error('Erro ao deletar nota fiscal.');
      console.error('Erro ao deletar nota:', error);
    }
  };


  if (loading) {
    return <Title>Carregando Notas Fiscais...</Title>;
  }

  return (
    <div>
      <Title>Gestão de Notas Fiscais</Title>

      <StatsGrid>
        <StatCard>
          <h4>FATURAMENTO TOTAL</h4>
          <p>{formatCurrency(faturamento.faturamento_total || 0)}</p>
        </StatCard>
        <StatCard>
          <h4>TOTAL PAGO</h4>
          <p style={{ color: '#4CAF50' }}>{formatCurrency(faturamento.total_recebido || 0)}</p>
        </StatCard>
        <StatCard>
          <h4>TOTAL PENDENTE</h4>
          <p style={{ color: '#CC0000' }}>{formatCurrency(faturamento.total_pendente || 0)}</p>
        </StatCard>
        <StatCard>
          <h4>TICKET MÉDIO</h4>
          <p>{formatCurrency(faturamento.ticket_medio || 0)}</p>
        </StatCard>
      </StatsGrid>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>NF Nº</th>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Emissão</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {notasFiscais.map((nota) => (
              <tr key={nota.id}>
                <td>{nota.numero}</td>
                <td>{nota.cliente_nome}</td>
                <td>{nota.servico_descricao}</td>
                <td>{formatDate(nota.data_emissao)}</td>
                <td>{formatDate(nota.data_vencimento)}</td>
                <td>{formatCurrency(nota.valor)}</td>
                <td>
                  <StatusBadge status={nota.status}>
                    {nota.status.toUpperCase()}
                  </StatusBadge>
                </td>
                <td>
                  <ActionsContainer>
                    <ActionButton
                      type="edit"
                      onClick={() => abrirModalEdicao(nota)}
                    >
                      <FaEdit /> Editar
                    </ActionButton>
                    
                    {nota.status === 'pendente' && (
                      <ActionButton 
                        type="pay"
                        onClick={() => handleMudarStatus(nota, 'paga')}
                      >
                        <FaMoneyBillWave /> Pagar
                      </ActionButton>
                    )}
                    
                    {nota.status === 'paga' && (
                      <ActionButton 
                        type="pending"
                        onClick={() => handleMudarStatus(nota, 'pendente')}
                      >
                        <FaClock /> Pendente
                      </ActionButton>
                    )}
                    
                    <ActionButton 
                      type="delete"
                      onClick={() => handleDeletarNota(nota.id, nota.numero)}
                    >
                      <FaTrash /> Deletar
                    </ActionButton>
                  </ActionsContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {notasFiscais.length === 0 && (
          <EmptyState>Nenhuma nota fiscal cadastrada.</EmptyState>
        )}
      </TableWrapper>

      {/* Modal de Edição */}
      <EditarNotaModal
        nota={notaEditando}
        isOpen={modalAberto}
        onClose={fecharModal}
        onUpdate={handleAtualizarNota}
      />
    </div>
  );
};

export default NotasFiscaisList;