// admin.js (Controller)

import bcrypt from 'bcryptjs';
import { db } from "../db.js";
// 🔑 NOVO: Importa a função de utilidade para manter o controller limpo
import { gerarCodigoAdmin } from "../utils/Admin_code.js"; 


// 1. Controller para Cadastro de Administrador
export const cadastroAdmin = async (req, res) => {
    try {
        const { nome, email, telefone, senha, confirmarSenha } = req.body;

        if (senha !== confirmarSenha) {
            return res.status(400).json({ error: 'As senhas não coincidem' });
        }

        const existingAdmin = await db.all(
            'SELECT id FROM administradores WHERE email = ?',
            [email]
        );

        if (existingAdmin.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const codigoAcesso = gerarCodigoAdmin(); // Chamada para a função importada
        const hashedPassword = await bcrypt.hash(senha, 10);

        await db.run(
            'INSERT INTO administradores (nome, email, telefone, senha, codigo_acesso) VALUES (?, ?, ?, ?, ?)',
            [nome, email, telefone, hashedPassword, codigoAcesso]
        );

        res.json({
            success: true,
            message: 'Administrador cadastrado com sucesso!',
            codigoAcesso: codigoAcesso 
        });
    } catch (error) {
        console.error("Erro no cadastroAdmin:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// 2. Controller para Login de Administrador
export const loginAdmin = async (req, res) => {
    try {
        const { codigoAcesso, senha } = req.body; 
        
        if (!codigoAcesso || !senha) {
            return res.status(400).json({ error: 'Código e senha são obrigatórios.' });
        }

        const admins = await db.all(
            'SELECT * FROM administradores WHERE codigo_acesso = ?',
            [codigoAcesso.toUpperCase()] 
        );

        if (admins.length === 0) {
            return res.status(401).json({ error: 'Código de Acesso ou senha incorretos' });
        }

        const admin = admins[0];
        const validPassword = await bcrypt.compare(senha, admin.senha);

        if (!validPassword) {
            return res.status(401).json({ error: 'Código de Acesso ou senha incorretos' });
        }

        // Sessão e retorno
        req.session.adminId = admin.id;
        req.session.adminEmail = admin.email;
        req.session.adminName = admin.nome;

        res.json({
            success: true,
            message: 'Login de administrador realizado com sucesso!',
            admin: {
                id: admin.id,
                nome: admin.nome,
                email: admin.email
            }
        });
    } catch (error) {
        console.error("Erro no loginAdmin:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};