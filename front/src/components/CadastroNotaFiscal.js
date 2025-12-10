// src/components/CadastroNotaFiscal.js

import React, { useState, useEffect } from 'react';
import { createNotaFiscal, getClientes, getServicos } from '../services/invoicingApi';
import { toast } from 'react-toastify';
import { FaSave, FaTimesCircle } from 'react-icons/fa';

// Importa os estilos padronizados
import { 
    InvoicingContainer, 
    Title, 
    FormGrid, 
    FormGroup, 
    ModalActions, 
    BtnCancel, 
    BtnSave 
} from '../styles/invoicing'; 

const CadastroNotaFiscal = ({ onCadastroSuccess, onCancel }) => {
    const initialFormData = {
        numero: '',
        valor: '',
        data_emissao: new Date().toISOString().split('T')[0], // Data de hoje
        data_vencimento: '',
        status: 'pendente',
        cliente_id: '',
        servico_id: '',
        observacoes: ''
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [clientes, setClientes] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [clientesData, servicosData] = await Promise.all([
                getClientes(),
                getServicos()
            ]);
            setClientes(clientesData);
            setServicos(servicosData.map(s => ({
                ...s,
                valor: parseFloat(s.valor) 
            })));
        } catch (error) {
            toast.error('Erro ao carregar dados essenciais (Clientes/Serviços).');
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
        
        // 1. Encontra o serviço selecionado para pegar o valor
        const selectedService = servicos.find(s => s.id === parseInt(formData.servico_id));
        
        // 2. Monta o objeto final para a API
        const notaParaCriar = {
            ...formData,
            // Sobrescreve o valor com o valor do serviço, garantindo que é um número.
            valor: selectedService ? selectedService.valor : parseFloat(formData.valor) || 0,
            // A API de back-end (MySQL) provavelmente define o número da NF
            // Removendo o 'numero' se for gerado no back-end
            numero: formData.numero || undefined 
        };

        try {
            await createNotaFiscal(notaParaCriar);
            toast.success(' Nota fiscal cadastrada com sucesso!');
            setFormData(initialFormData); // Limpa o formulário
            onCadastroSuccess(); // Chama a função para mudar de tela (se aplicável)
        } catch (error) {
            toast.error(' Erro ao cadastrar a nota fiscal.');
            console.error('Erro ao criar nota:', error);
        } finally {
            setLoading(false);
        }
    };

    // Verifica se os campos obrigatórios estão preenchidos para habilitar o botão
    const isFormValid = formData.cliente_id && formData.servico_id && formData.data_vencimento;

    return (
        <InvoicingContainer>
            <Title>Cadastrar Nova Nota Fiscal</Title>

            <form onSubmit={handleSubmit} style={{ 
                background: '#FFFFFF', 
                padding: '30px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' 
            }}>
                <FormGrid>
                    {/* Número da NF (Opcional, pode ser gerado no backend) */}
                    <FormGroup>
                        <label>NF Nº (Opcional):</label>
                        <input
                            type="text"
                            name="numero"
                            value={formData.numero || ''}
                            onChange={handleChange}
                            placeholder="Deixe em branco para auto-gerar"
                        />
                    </FormGroup>

                    {/* Campo de Serviço (Chave para o valor) */}
                    <FormGroup>
                        <label>Serviço:*</label>
                        <select
                            name="servico_id"
                            value={formData.servico_id || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um serviço</option>
                            {servicos.map(servico => (
                                <option key={servico.id} value={servico.id}>
                                    {servico.descricao} - {servico.valor ? `R$ ${parseFloat(servico.valor).toFixed(2)}` : 'R$ 0,00'}
                                </option>
                            ))}
                        </select>
                    </FormGroup>

                    {/* Cliente */}
                    <FormGroup>
                        <label>Cliente:*</label>
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
                    
                    {/* Data de Vencimento */}
                    <FormGroup>
                        <label>Data de Vencimento:*</label>
                        <input
                            type="date"
                            name="data_vencimento"
                            value={formData.data_vencimento}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    
                    {/* Data de Emissão */}
                    <FormGroup>
                        <label>Data de Emissão:</label>
                        <input
                            type="date"
                            name="data_emissao"
                            value={formData.data_emissao}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    {/* Status Inicial */}
                    <FormGroup>
                        <label>Status Inicial:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="pendente">Pendente</option>
                            <option value="paga">Paga</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                    </FormGroup>
                </FormGrid>
                
                {/* Observações (Full Width) */}
                <FormGroup style={{ gridColumn: '1 / -1' }}> 
                    <label>Observações:</label>
                    <textarea
                        name="observacoes"
                        value={formData.observacoes || ''}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Informações adicionais sobre a nota."
                    />
                </FormGroup>


                <ModalActions style={{ borderTop: 'none', paddingTop: '0' }}>
                    {onCancel && (
                        <BtnCancel type="button" onClick={onCancel}>
                            <FaTimesCircle /> Cancelar
                        </BtnCancel>
                    )}
                    <BtnSave type="submit" disabled={loading || !isFormValid}>
                        <FaSave /> {loading ? 'Cadastrando...' : 'Cadastrar Nota'}
                    </BtnSave>
                </ModalActions>
            </form>
        </InvoicingContainer>
    );
};

export default CadastroNotaFiscal;