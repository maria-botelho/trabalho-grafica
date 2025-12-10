// src/components/Cadastro.js (Atualizado com SecondaryButton)
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    UserBody, 
    FormCard, 
    FormLeft, 
    FormRight,
    InputArea, 
    Input,     
    Label,     
    Button,
    SecondaryButton, // NOVO: Importado
    LinkButtonContainer // NOVO: Importado
} from '../styles/form.js'; 

const API_BASE_URL = "http://localhost:3000/api";

const Cadastro = ({ onRegisterSuccess, onGoToLogin, onGoToAdminRegister }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            return toast.error("As senhas não coincidem!");
        }
        if (!nome || !email || !senha) {
            return toast.warn("Preencha nome, e-mail e senha!");
        }

        try {
            const res = await axios.post(API_BASE_URL + '/user/cadastro', {
                nome,
                email,
                telefone,
                senha,
            });
            
            toast.success(res.data.message || "Cadastro realizado com sucesso! Faça login.");
            onRegisterSuccess(); // Chama a função para voltar para a tela de Login

        } catch (error) {
            const errorMessage = error.response?.data?.error || "Erro ao realizar cadastro. Tente novamente.";
            toast.error(errorMessage);
        }
    };

    return (
        <UserBody>
            <FormCard>
                <FormLeft>
                    <h1>Cadastre-se</h1>
                    <p>Crie sua conta de cliente para solicitar orçamentos e acompanhar seus pedidos.</p>
                </FormLeft>
                <FormRight>
                    <h2>Criação de Conta</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Inputs (Nome, Email, Telefone, Senha, Confirmar Senha) */}
                        <InputArea>
                            <Label htmlFor="nome">Nome Completo</Label>
                            <Input type="text" id="nome" placeholder="Digite seu nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="email">E-mail</Label>
                            <Input type="email" id="email" placeholder="Digite seu e-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input type="tel" id="telefone" placeholder="Digite seu telefone (opcional)" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="senha">Senha</Label>
                            <Input type="password" id="senha" placeholder="Crie uma senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="confirmar">Confirmar senha</Label>
                            <Input type="password" id="confirmar" placeholder="Confirme sua senha" required value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        </InputArea>

                        <Button type="submit">Cadastrar</Button>
                    </form>
                    
                    {/* NOVO: Ações Secundárias como Botões */}
                    <LinkButtonContainer>
                        <SecondaryButton type="button" onClick={onGoToLogin}>
                            Já tem conta? <strong>Faça login</strong>
                        </SecondaryButton>
                        <SecondaryButton type="button" onClick={onGoToAdminRegister}>
                            Acesso exclusivo? <strong>Cadastro Administrador</strong>
                        </SecondaryButton>
                    </LinkButtonContainer>
                </FormRight>
            </FormCard>
        </UserBody>
    );
};

export default Cadastro;