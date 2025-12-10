// src/services/invoicingApi.js (Baseado no api.js do colega)

// Mantendo a URL da API de Notas Fiscais separada, conforme o backend (server.js)
const API_URL = 'http://localhost:3001/api';

// --- FUNÇÕES DE BUSCA (GET) ---

// Buscar todas as notas fiscais
export const getNotasFiscais = async () => {
  const response = await fetch(`${API_URL}/notas-fiscais`);
  if (!response.ok) throw new Error('Erro ao buscar Notas Fiscais');
  return await response.json();
};

// Buscar clientes
export const getClientes = async () => {
  const response = await fetch(`${API_URL}/clientes`);
  if (!response.ok) throw new Error('Erro ao buscar Clientes');
  return await response.json();
};

// Buscar serviços
export const getServicos = async () => {
  const response = await fetch(`${API_URL}/servicos`);
  if (!response.ok) throw new Error('Erro ao buscar Serviços');
  return await response.json();
};

// Buscar faturamento
export const getFaturamento = async () => {
  const response = await fetch(`${API_URL}/faturamento`);
  if (!response.ok) throw new Error('Erro ao buscar Faturamento');
  return await response.json();
};

// --- FUNÇÕES DE TRANSAÇÃO (POST, PUT, DELETE) ---

// Criar nova nota fiscal
export const createNotaFiscal = async (notaFiscal) => {
  const response = await fetch(`${API_URL}/notas-fiscais`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notaFiscal),
  });
  if (!response.ok) throw new Error('Erro ao criar Nota Fiscal');
  return await response.json();
};

// Atualizar nota fiscal (usado para edição e mudança de status)
export const updateNotaFiscal = async (id, notaFiscal) => {
  const response = await fetch(`${API_URL}/notas-fiscais/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notaFiscal),
  });
  if (!response.ok) throw new Error('Erro ao atualizar Nota Fiscal');
  return await response.json();
};

// Deletar nota fiscal
export const deleteNotaFiscal = async (id) => {
  const response = await fetch(`${API_URL}/notas-fiscais/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao deletar Nota Fiscal');
  return await response.json();
};