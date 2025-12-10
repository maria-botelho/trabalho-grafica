import express from 'express';
// Importa APENAS as funções de lógica do novo Controller
import { 
    cadastroUsuario, 
    loginUsuario, 
    esquecerSenha 
} from '../controllers/user.js'; 

const router = express.Router();

// A rota APENAS chama a função do Controller
router.post('/cadastro', cadastroUsuario);

// A rota APENAS chama a função do Controller
router.post('/login', loginUsuario);

// A rota APENAS chama a função do Controller
router.post('/esqueceu-senha', esquecerSenha);

export default router;