// index.js (Atualizado)

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
// IMPORTAR A FUNÇÃO DE SETUP DO BANCO DE DADOS
import { setupDatabase } from './db.js'; // Ajuste o caminho se necessário!

// Importar Rotas
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import pedidosRoutes from './routes/pedidos.js'; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
  secret: 'silveira-soares-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


// 2. Usar uma função async para iniciar o banco e o servidor
async function startServer() {
    await setupDatabase(); // Garante que o banco e a tabela estão prontos
    
    app.use('/api/user', userRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/pedidos', pedidosRoutes); 
    
    // CORREÇÃO ESSENCIAL: INICIALIZA O SERVIDOR PARA OUVIR REQUISIÇÕES
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

startServer();