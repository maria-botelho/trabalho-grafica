import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

// Endereço base da API de Pedidos.
const API_PEDIDOS_URL = "http://localhost:3000/api/pedidos";

// --- STYLED COMPONENTS (Estilização da Tabela - Exclusivos do Grid) ---

const TableCard = styled.div`
  background-color: #FFFFFF; 
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  width: 100%;
  overflow-x: auto; /* Garante que a tabela seja responsiva */
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px; 
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f7f9fc;
  }
`;

const Th = styled.th`
  text-align: start;
  border-bottom: 2px solid #BDBDBD;
  padding: 12px 10px;
  color: #000000; 
  font-weight: 600;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Td = styled.td`
  padding: 10px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  word-wrap: break-word; 
  max-width: 250px;
  color: #333;
  font-size: 0.95rem;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ActionIcon = styled.span`
  cursor: pointer;
  color: #000000; 
  transition: color 0.2s;

  &:hover {
    color: #0066CC;
  }

  &.trash {
    &:hover {
      color: #CC0000; 
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  min-width: 80px;
  background-color: ${props => 
    props.status === 'Concluído' ? '#E6FFED' : 
    props.status === 'Em Andamento' ? '#FFFBE6' : 
    props.status === 'Pendente' ? '#FFECEB' : 
    '#E5E5E5'};
  color: ${props => 
    props.status === 'Concluído' ? '#00703C' : 
    props.status === 'Em Andamento' ? '#B8860B' : 
    props.status === 'Pendente' ? '#CC0000' : 
    '#1F1F1F'};
  border: 1px solid ${props => 
    props.status === 'Concluído' ? '#C6F6D5' : 
    props.status === 'Em Andamento' ? '#FFF3B8' : 
    props.status === 'Pendente' ? '#FFD0CC' : 
    '#BDBDBD'};
`;

// --- COMPONENTE PRINCIPAL ---

const Grid = ({ pedidos, setOnEdit, getPedidos }) => {
    
  // 1. Função de Exclusão
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_PEDIDOS_URL}/${id}`);
      toast.success("Pedido excluído com sucesso!");
      getPedidos(); // Atualiza a lista após a exclusão
    } catch (error) {
      toast.error("Erro ao excluir o pedido: " + (error.response?.data || error.message));
    }
  };

  // 2. Função de Edição
  const handleEdit = (item) => {
    // Passa o item selecionado para o estado de edição do componente pai
    setOnEdit(item);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola para o topo (onde o Form está)
  };


  return (
    <TableCard>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Cliente</Th>
            <Th onlyWeb>E-mail</Th>
            <Th>Descrição</Th>
            <Th>Status</Th>
            <Th width="10%" alignCenter>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pedidos.length > 0 ? (
            pedidos.map((item, i) => (
              <Tr key={i}>
                <Td width="5%">{item.id}</Td>
                <Td width="20%">{item.clientes}</Td>
                <Td width="25%" onlyWeb>{item.email}</Td>
                <Td width="30%">{item.descricao}</Td>
                <Td width="10%">
                  <StatusBadge status={item.status}>{item.status}</StatusBadge>
                </Td>
                
                {/* Coluna de Ações */}
                <Td alignCenter width="10%">
                  <ActionsContainer>
                    <ActionIcon title="Editar">
                      <FaEdit onClick={() => handleEdit(item)} size={16} />
                    </ActionIcon>
                    <ActionIcon className="trash" title="Excluir">
                      <FaTrash onClick={() => handleDelete(item.id)} size={16} />
                    </ActionIcon>
                  </ActionsContainer>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="6" alignCenter style={{ padding: '20px', color: '#888' }}>
                Nenhum pedido encontrado.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableCard>
  );
};

export default Grid;