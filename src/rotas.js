const express = require("express");
const { listarImoveis, criarImovel, atualizarImovel, deletarImovel } = require("./controladores/imoveisController");

const rotas = express()

rotas.get("/listar", listarImoveis);
rotas.post("/cadastrar", criarImovel);
rotas.put("/atualizar/:id/imovel", atualizarImovel);
rotas.delete("/deletar/:id/imovel", deletarImovel);

module.exports = rotas;