import express from "express";
import { addPedido, deletePedido, getPedidos, updatePedido } from "../controllers/pedidos.js";

const router = express.Router()

router.get("/", getPedidos)

router.post("/", addPedido)

router.put("/:id", updatePedido)

router.delete("/:id", deletePedido)

export default router