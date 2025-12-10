// src/components/RecuperarSenha.js (Atualizado com SecondaryButton)
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

const RecuperarSenha = ({ onGoToLogin }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.warn("Preencha o e-mail cadastrado!");
        }

        try {
            const res = await axios.post(API_BASE_URL + '/user/esqueceu-senha', { email });
            
            toast.success(res.data.message || "Instruções de redefinição de senha enviadas para o seu e-mail (se cadastrado).");

        } catch (error) {
            const errorMessage = error.response?.data?.error || "Erro ao solicitar redefinição de senha. Tente novamente.";
            toast.error(errorMessage);
        }
    };

    return (
        <UserBody>
            <FormCard>
                <FormLeft>
                    <h1>Recuperação de Senha</h1>
                    <p>Informe o e-mail da sua conta e enviaremos um link para você redefinir sua senha.</p>
                </FormLeft>
                <FormRight>
                    <h2>Esqueceu a senha?</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Input E-mail */}
                        <InputArea>
                            <Label htmlFor="email">E-mail Cadastrado</Label>
                            <Input 
                                type="email" 
                                id="email" 
                                placeholder="Digite seu e-mail" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputArea>
                        
                        <Button type="submit">Solicitar Redefinição</Button>
                    </form>
                    
                    {/* NOVO: Ação Secundária como Botão */}
                    <LinkButtonContainer>
                        <SecondaryButton type="button" onClick={onGoToLogin}>
                            Lembrou a senha? <strong>Voltar para o Login</strong>
                        </SecondaryButton>
                    </LinkButtonContainer>
                </FormRight>
            </FormCard>
        </UserBody>
    );
};

export default RecuperarSenha;