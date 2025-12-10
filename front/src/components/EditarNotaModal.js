// src/components/EditarNotaModal.js

import React, { useState, useEffect } from 'react';
import { updateNotaFiscal, getClientes, getServicos } from '../services/invoicingApi';
import { toast } from 'react-toastify';

// Importa os estilos padronizados
import { 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  FormGrid, 
  FormGroup, 
  ModalActions, 
  BtnCancel, 
  BtnSave 
} from '../styles/invoicing'; 


const EditarNotaModal = ({ nota, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (nota && isOpen) {
      // Ajusta as datas para o formato yyyy-MM-dd que o input type="date" espera
      const formatData = (dateStr) => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
      };

      setFormData({
        ...nota,
        data_emissao: formatData(nota.data_emissao),
        data_vencimento: formatData(nota.data_vencimento),
      });
      carregarDados();
    }
  }, [nota, isOpen]);

  const carregarDados = async () => {
    try {
      const [clientesData, servicosData] = await Promise.all([
        getClientes(),
        getServicos()
      ]);
      setClientes(clientesData);
      setServicos(servicosData.map(s => ({
          ...s,
          // Garante que o valor é um número
          valor: parseFloat(s.valor) 
      })));
    } catch (error) {
      toast.error('Erro ao carregar dados de Clientes/Serviços.');
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Calcula o valor da nota a partir do servico_id
    const selectedService = servicos.find(s => s.id === parseInt(formData.servico_id));
    const valorCalculado = selectedService ? selectedService.valor : formData.valor;

    try {
      await updateNotaFiscal(nota.id, {
        ...formData,
        // Usa o valor calculado do serviço ou o valor original se for edição manual
        valor: valorCalculado || formData.valor, 
      });
      toast.success('Nota fiscal atualizada com sucesso!');
      onUpdate(); 
      onClose();
    } catch (error) {
      toast.error('Erro ao salvar as alterações da nota.');
      console.error('Erro ao atualizar nota:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          Editar Nota Fiscal Nº {nota?.numero}
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <FormGrid>
            {/* Campos de Data */}
            <FormGroup>
              <label>Data de Emissão:</label>
              <input
                type="date"
                name="data_emissao"
                value={formData.data_emissao || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Data de Vencimento:</label>
              <input
                type="date"
                name="data_vencimento"
                value={formData.data_vencimento || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormGrid>
            
          <FormGroup>
              <label>Cliente:</label>
              <select
                name="cliente_id"
                value={formData.cliente_id || ''}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </FormGroup>

          <FormGroup>
              <label>Serviço:</label>
              <select
                name="servico_id"
                value={formData.servico_id || ''}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um serviço</option>
                {servicos.map(servico => (
                  <option key={servico.id} value={servico.id}>
                    {servico.descricao} - R$ {servico.valor}
                  </option>
                ))}
              </select>
            </FormGroup>


          <FormGroup>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
              required
            >
              <option value="pendente">Pendente</option>
              <option value="paga">Paga</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Observações:</label>
            <textarea
              name="observacoes"
              value={formData.observacoes || ''}
              onChange={handleChange}
              rows="3"
            />
          </FormGroup>

          <ModalActions>
            <BtnCancel type="button" onClick={onClose}>
              Cancelar
            </BtnCancel>
            <BtnSave type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </BtnSave>
          </ModalActions>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditarNotaModal;