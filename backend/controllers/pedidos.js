import { db } from "../db.js"; // Importa o objeto 'db' configurado

// Busca todos os pedidos (GET)
export const getPedidos = async (_, res) => {
    try {
        // db.all() é o método do SQLite para buscar todas as linhas (como o db.query)
        const data = await db.all("SELECT * FROM pedidos"); 
        return res.status(200).json(data);
    } catch (err) {
        return res.json(err);
    }
};

// Adicionar novo pedido (POST)
export const addPedido = async (req, res) => {
    // A sintaxe da query SQL é a mesma, mas usamos db.run() para INSERT, UPDATE, DELETE
    const q =
        "INSERT INTO pedidos(`clientes`, `email`, `descricao`, `status`) VALUES(?, ?, ?, ?)"; 

    const values = [
        req.body.clientes,
        req.body.email,
        req.body.descricao,
        req.body.status,
    ];
    
    try {
        await db.run(q, values);
        return res.status(200).json("Pedido criado com sucesso (SQLite).");
    } catch (err) {
        return res.json(err);
    }
};

// Atualizar pedido (PUT)
export const updatePedido = async (req, res) => {
    const q =
        "UPDATE pedidos SET clientes = ?, email = ?, descricao = ?, status = ? WHERE id = ?";

    const values = [
        req.body.clientes,
        req.body.email,
        req.body.descricao,
        req.body.status,
        req.params.id // O ID é o último valor para o último ?
    ];
    
    try {
        await db.run(q, values);
        return res.status(200).json("Pedido atualizado com sucesso (SQLite).");
    } catch (err) {
        return res.json(err);
    }
};

// Deletar pedido (DELETE)
export const deletePedido = async (req, res) => {
    const q = "DELETE FROM pedidos WHERE id = ?";
    
    try {
        await db.run(q, req.params.id);
        return res.status(200).json("Pedido deletado com sucesso (SQLite).");
    } catch (err) {
        return res.json(err);
    }
};