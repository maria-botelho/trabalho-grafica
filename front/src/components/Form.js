// src/components/Form.js (Corrigido e Completo)

import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
// 🚨 ATENÇÃO: Confirme que 'PedidosFormContainer' é o nome do styled-component da tag <form>
import { 
    InputArea, Input, Label, Button,
    PedidosFormContainer, PedidosSelect // <- Confirme estes nomes de importação
} from "../styles/form.js";

// 🚨 NOVO: O componente agora recebe a prop API_URL
const Form = ({ getPedidos, onEdit, setOnEdit, API_URL }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const pedidos = ref.current;

      pedidos.clientes.value = onEdit.clientes;
      pedidos.email.value = onEdit.email;
      pedidos.descricao.value = onEdit.descricao;
      pedidos.status.value = onEdit.status;
    }
  }, [onEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const pedidos = ref.current;

    if (
      !pedidos.clientes.value ||
      !pedidos.email.value ||
      !pedidos.descricao.value ||
      !pedidos.status.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      // Lógica de EDIÇÃO: usa a prop API_URL
      await axios
        .put(API_URL + "/" + onEdit.id, {
          clientes: pedidos.clientes.value,
          email: pedidos.email.value,
          descricao: pedidos.descricao.value,
          status: pedidos.status.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      // Lógica de CRIAÇÃO: usa a prop API_URL
      await axios
        .post(API_URL, {
          clientes: pedidos.clientes.value,
          email: pedidos.email.value,
          descricao: pedidos.descricao.value,
          status: pedidos.status.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    // Limpar campos
    pedidos.clientes.value = "";
    pedidos.email.value = "";
    pedidos.descricao.value = "";
    pedidos.status.value = "";

    setOnEdit(null);
    getPedidos();
  };

  return (
    // 🚨 ATENÇÃO: Mantenha o nome 'PedidosFormContainer' ou ajuste para o que você exportou.
    <PedidosFormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="clientes" placeholder="Digite o nome do cliente" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" placeholder="Digite o email do cliente" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" placeholder="Digite a descrição do serviço"/>
      </InputArea>
      <InputArea>
        <Label>Status</Label>
        {/* ATENÇÃO: Use PedidosSelect se foi assim que você renomeou o styled.select */}
        <PedidosSelect name="status"> 
            <option value="">Selecione</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Finalizado">Finalizado</option>
        </PedidosSelect>
      </InputArea>

      <Button type="submit">{onEdit ? "ATUALIZAR" : "SALVAR"}</Button>
    </PedidosFormContainer>
  );
};

export default Form;