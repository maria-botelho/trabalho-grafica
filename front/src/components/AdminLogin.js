// src/components/AdminLogin.js (Modificado)
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
    SecondaryButton, 
    LinkButtonContainer 
} from '../styles/form.js'; 

const API_BASE_URL = "http://localhost:3000/api";

const AdminLogin = ({ onLogin, onGoToUserLogin, onGoToAdminRegister }) => {
    // 🔑 Estado para o código de 6 caracteres
    const [codigoAcesso, setCodigoAcesso] = useState(''); 
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!codigoAcesso || !senha) {
            return toast.warn("Preencha o código de acesso e a senha!");
        }
        
        // 🚨 NOVO: Validação do tamanho do código
        if (codigoAcesso.length !== 6) {
            return toast.error("O Código de Acesso deve ter 6 caracteres.");
        }

        try {
            // 🔑 MODIFICAÇÃO: Envia 'codigoAcesso' (string de 6 caracteres) no payload
            const res = await axios.post(API_BASE_URL + '/admin/login', { 
                codigoAcesso: codigoAcesso.toUpperCase(), // Envia em maiúsculo, como o back espera
                senha 
            });
            
            onLogin(res.data.admin);
            toast.success(res.data.message || "Login de administrador realizado com sucesso!");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Erro no login. Verifique o código e a senha.";
            toast.error(errorMessage);
        }
    };

    return (
        <UserBody>
            <FormCard>
                <FormLeft>
                    <h1>Acesso Administrativo</h1>
                    <p>Entre com seu código de acesso exclusivo e senha para gerenciar a gráfica.</p>
                </FormLeft>
                <FormRight>
                    <h2>Login Admin</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Input Código de Acesso */}
                        <InputArea>
                            <Label htmlFor="codigo">Código de Acesso</Label>
                            <Input 
                                type="text" 
                                id="codigo" 
                                placeholder="Seu código de 6 dígitos (Ex: A5B3F1)" 
                                required 
                                value={codigoAcesso}
                                // 🔑 MODIFICAÇÃO: Armazena em maiúsculo e limita a 6 caracteres
                                onChange={(e) => setCodigoAcesso(e.target.value.toUpperCase())} 
                                maxLength={6} 
                            />
                        </InputArea>
                        
                        {/* Input Senha */}
                        <InputArea>
                            <Label htmlFor="senha">Senha</Label>
                            <Input 
                                type="password" 
                                id="senha" 
                                placeholder="Digite sua senha" 
                                required 
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </InputArea>

                        <Button type="submit">Entrar como Admin</Button>
                    </form>

                    {/* Ações Secundárias como Botões */}
                    <LinkButtonContainer>
                        <SecondaryButton type="button" onClick={onGoToUserLogin}>
                            Não é administrador? <strong>Acesso do Cliente</strong>
                        </SecondaryButton>
                        <SecondaryButton type="button" onClick={onGoToAdminRegister}>
                            Não tem conta admin? <strong>Cadastre-se Admin</strong>
                        </SecondaryButton>
                    </LinkButtonContainer>
                </FormRight>
            </FormCard>
        </UserBody>
    );
};

export default AdminLogin;