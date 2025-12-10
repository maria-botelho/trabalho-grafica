import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Nome do arquivo que será o seu banco de dados
const DB_FILE = './banco-grafica.sqlite'; 

export let db = null;

// Função assíncrona para iniciar a conexão e criar as tabelas
export async function setupDatabase() {
    try {
        db = await open({
            filename: DB_FILE,
            driver: sqlite3.Database // Usa o driver sqlite3
        });

        console.log(`Conectado ao banco de dados SQLite: ${DB_FILE}`);

        // 1. Tabela para Usuários Normais (Clientes)
        await db.exec(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL, 
                telefone TEXT,
                senha TEXT NOT NULL
            );
        `);
        console.log("Tabela 'usuarios' verificada/criada com sucesso.");

        // 2. Tabela para Administradores
        await db.exec(`
            CREATE TABLE IF NOT EXISTS administradores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL, 
                telefone TEXT,
                senha TEXT NOT NULL,
                codigo_acesso TEXT UNIQUE NOT NULL
            );
        `);
        console.log("Tabela 'administradores' verificada/criada com sucesso.");

        // 3. Tabela para Pedidos (mantida)
        await db.exec(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                clientes TEXT NOT NULL,
                email TEXT NOT NULL,
                descricao TEXT,
                status TEXT
            );
        `);
        console.log("Tabela 'pedidos' verificada/criada com sucesso.");

    } catch (error) {
        console.error("ERRO AO INICIAR O BANCO DE DADOS SQLITE:", error);
        process.exit(1);
    }
}