// src/components/Login.js (Completo)
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
    LinkButtonContainer, 
    SubtleLink 
} from '../styles/form.js'; 

const API_BASE_URL = "http://localhost:3000/api";

// Certifique-se de que todas as props necessárias estão sendo recebidas
const Login = ({ onLogin, onGoToRegister, onGoToAdminLogin, onGoToForgotPassword }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            return toast.warn("Preencha todos os campos!");
        }

        try {
            const res = await axios.post(API_BASE_URL + '/user/login', { email, senha });
            onLogin(res.data.user); 
            toast.success(res.data.message || "Login realizado com sucesso!");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Erro ao fazer login. Verifique suas credenciais.";
            toast.error(errorMessage);
        }
    };

    return (
        <UserBody>
            <FormCard>
                {/* Lado Esquerdo (Visual) */}
                <FormLeft>
                    <h1>Bem-vindo de volta!</h1>
                    <p>Faça login para gerenciar seus pedidos.</p>
                </FormLeft>
                
                {/* Lado Direito (Formulário) */}
                <FormRight>
                    <h2>Acesso ao Cliente</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Input E-mail */}
                        <InputArea>
                            <Label htmlFor="email">E-mail</Label>
                            <Input 
                                type="email" 
                                id="email" 
                                placeholder="Digite seu e-mail" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                        {/* Link de Recuperação de Senha */}
                        <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                            <SubtleLink onClick={onGoToForgotPassword}>Esqueceu a senha?</SubtleLink>
                        </div>

                        {/* Botão Principal */}
                        <Button type="submit">Entrar</Button>
                    </form>
                    
                    {/* Ações Secundárias (Botões) */}
                    <LinkButtonContainer>
                        <SecondaryButton type="button" onClick={onGoToRegister}>
                            Não tem conta? <strong>Cadastre-se</strong>
                        </SecondaryButton>
                        <SecondaryButton type="button" onClick={onGoToAdminLogin}>
                            Acesso exclusivo? <strong>Login Administrador</strong>
                        </SecondaryButton>
                    </LinkButtonContainer>
                </FormRight>
            </FormCard>
        </UserBody>
    );
};

export default Login;