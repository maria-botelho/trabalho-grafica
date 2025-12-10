// utils/Admin.code.js

import crypto from 'crypto';

/**
 * @description Gera um código alfanumérico aleatório (token) de 6 caracteres,
 * criptograficamente seguro (Hexadecimal).
 * @returns {string} Código de acesso de 6 caracteres em maiúsculo (Ex: 8A9B2F).
 */
export function gerarCodigoAdmin() {
    // Usa 3 bytes de dados aleatórios, que resultam em 6 caracteres hexadecimais (3 * 2)
    // O módulo 'crypto' é nativo do Node.js e oferece segurança.
    const code = crypto.randomBytes(3).toString('hex').toUpperCase(); 
    return code;
}