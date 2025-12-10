// controllers/user.js (Novo Arquivo)

import { db } from '../db.js'; 
import bcrypt from 'bcrypt';
// importou de 'react-toastify' no controller.js mas o uso é no front
// Se você não instalou o 'bcrypt', use 'npm install bcrypt'

// ------------------------------------------
// LÓGICA DE CADASTRO
// ------------------------------------------
export const cadastroUsuario = async (req, res) => {
    const { nome, email, telefone, senha, confirmarSenha } = req.body;

    if (!nome || !email || !senha || !confirmarSenha) {
        return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    if (senha !== confirmarSenha) {
        return res.status(400).json({ error: "As senhas não coincidem." });
    }
    
    try {
        // 1. Verificar se o e-mail já existe
        const existingUser = await db.get('SELECT email FROM usuarios WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(409).json({ error: "E-mail já cadastrado." });
        }

        // 2. Hash da Senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // 3. Inserir no Banco de Dados
        await db.run(
            'INSERT INTO usuarios (nome, email, telefone, senha) VALUES (?, ?, ?, ?)',
            [nome, email, telefone || null, hashedPassword]
        );

        return res.status(201).json({ 
            message: "Usuário cadastrado com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

// ------------------------------------------
// LÓGICA DE LOGIN
// ------------------------------------------
export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Preencha e-mail e senha." });
    }

    try {
        // 1. Buscar o usuário pelo e-mail
        const user = await db.get('SELECT id, nome, email, senha FROM usuarios WHERE email = ?', [email]);

        if (!user) {
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        // 2. Comparar a senha
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            return res.status(401).json({ error: "E-mail ou senha incorretos." });
        }

        // 3. Sucesso (Omitindo a senha no retorno e definindo a sessão)
        const { senha: _, ...userWithoutPassword } = user;
        req.session.userId = user.id;

        return res.status(200).json({ 
            message: "Login realizado com sucesso!",
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

// ------------------------------------------
// LÓGICA DE ESQUECEU SENHA (placeholder)
// ------------------------------------------
export const esquecerSenha = (req, res) => {
    res.status(501).json({ error: "Funcionalidade de recuperação de senha não implementada." });
};