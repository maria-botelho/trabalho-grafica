// src/components/AdminCadastro.js (Modificado)
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

const AdminCadastro = ({ onRegisterSuccess, onGoToAdminLogin, onGoToUserRegister }) => {
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
            const res = await axios.post(API_BASE_URL + '/admin/cadastro', {
                nome,
                email,
                telefone,
                senha,
                confirmarSenha
            });

            // 🔑 MODIFICAÇÃO: Exibe o código de acesso retornado pelo backend
            const codigoGerado = res.data.codigoAcesso; 
            
            toast.success(
                `Administrador cadastrado com sucesso! Seu Código de Acesso é: ${codigoGerado}. Use-o para fazer login!`,
                { autoClose: 10000, position: "top-center" } // Exibe por mais tempo
            );
            
            onRegisterSuccess();
            onGoToAdminLogin(); // Redireciona para o login do Admin
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Erro ao cadastrar administrador. Tente novamente.";
            toast.error(errorMessage);
        }
    };

    return (
        <UserBody>
            <FormCard>
                <FormLeft>
                    <h1>Cadastro de Administrador</h1>
                    <p>Cadastre-se para obter um código de acesso exclusivo e gerenciar o sistema da gráfica.</p>
                </FormLeft>
                <FormRight>
                    <h2>Cadastre-se Admin</h2>
                    <form onSubmit={handleSubmit}>
                        <InputArea>
                            <Label htmlFor="nome">Nome</Label>
                            <Input type="text" id="nome" placeholder="Seu nome completo" required value={nome} onChange={(e) => setNome(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="email">E-mail</Label>
                            <Input type="email" id="email" placeholder="Seu e-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input type="tel" id="telefone" placeholder="Seu telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="senha">Senha</Label>
                            <Input type="password" id="senha" placeholder="Crie uma senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </InputArea>
                        <InputArea>
                            <Label htmlFor="confirmar">Confirmar senha</Label>
                            <Input type="password" id="confirmar" placeholder="Confirme sua senha" required value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        </InputArea>

                        <Button type="submit">Cadastrar Admin</Button>
                    </form>

                    {/* NOVO: Ações Secundárias como Botões */}
                    <LinkButtonContainer>
                        <SecondaryButton type="button" onClick={onGoToAdminLogin}>
                            Já é administrador? <strong>Faça login</strong>
                        </SecondaryButton>
                        <SecondaryButton type="button" onClick={onGoToUserRegister}>
                            Não é administrador? <strong>Cadastro do Cliente</strong>
                        </SecondaryButton>
                    </LinkButtonContainer>
                </FormRight>
            </FormCard>
        </UserBody>
    );
};

export default AdminCadastro;