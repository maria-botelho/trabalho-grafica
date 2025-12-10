import express from 'express';
// Importa APENAS as funções de lógica do novo Controller
import { 
    cadastroAdmin, 
    loginAdmin
} from '../controllers/admin.js'; 

const router = express.Router();

// Rotas apenas chamam o Controller
router.post('/cadastro', cadastroAdmin);

// Rotas apenas chamam o Controller
router.post('/login', loginAdmin);

export default router;