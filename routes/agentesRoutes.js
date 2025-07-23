const express = require("express");
const agentesRouter = express.Router();
const agentesController = require("../controllers/agentesController");

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Lista todos os agentes
 *     responses:
 *       200:
 *         description: Lista de agentes
 *       404:
 *         description: Nenhum agente encontrado
 */
agentesRouter.get("/agentes", agentesController.getAllAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Obtém um agente específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do agente
 *       404:
 *         description: Agente não encontrado
 */
agentesRouter.get("/agentes/:id", agentesController.getAgenteById);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Cria um novo agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *       400:
 *         description: Erro ao criar agente
 */
agentesRouter.post("/agentes", agentesController.createAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza um agente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar agente
 *       404:
 *         description: Agente não encontrado
 */
agentesRouter.put("/agentes/:id", agentesController.updateAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um agente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar agente
 *       404:
 *         description: Agente não encontrado
 */
agentesRouter.patch("/agentes/:id", agentesController.patchAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Deleta um agente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agente deletado com sucesso
 *       400:
 *         description: Erro ao deletar agente
 *       404:
 *         description: Agente não encontrado
 */
agentesRouter.delete("/agentes/:id", agentesController.deleteAgente);

/**
 * @swagger
 * /agentes/cargo/{cargo}:
 *   get:
 *     summary: Obtém agentes por cargo
 *     parameters:
 *       - in: path
 *         name: cargo
 *         required: true
 *         description: Cargo do agente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de agentes com o cargo especificado
 *       404:
 *         description: Nenhum agente encontrado com este cargo
 */
agentesRouter.get("/agentes/cargo/:cargo", agentesController.getAgentesByCargo);

module.exports = agentesRouter;