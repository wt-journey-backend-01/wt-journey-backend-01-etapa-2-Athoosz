const agentesRepository = require("../repositories/agentesRepository");
const { errorResponse } = require("../utils/errorHandler");
const {
   isValidUUID,
   isValidDate,
   isFutureDate,
} = require("../utils/validators");

function getAllAgentes(req, res) {
   const { sort, order = "asc", startDate, endDate } = req.query;
   let agentes;

   const validOrders = ["asc", "desc"];
   if (order && !validOrders.includes(order)) {
      return errorResponse(
         res,
         400,
         "O parâmetro 'order' deve ser 'asc' ou 'desc'"
      );
   }
   const orderParam = order;
   if (startDate && endDate) {
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
         return errorResponse(
            res,
            400,
            "Datas inválidas. Use o formato YYYY-MM-DD."
         );
      }
      if (new Date(startDate) > new Date(endDate)) {
         return errorResponse(
            res,
            400,
            "A data inicial não pode ser maior que a data final."
         );
      }
      agentes = agentesRepository.findByDataDeIncorporacaoRange(
         startDate,
         endDate
      );
   } else {
      agentes = agentesRepository.findAll();
   }

   if (sort === "dataDeIncorporacao") {
      agentes = [...agentes].sort((a, b) => {
         const dateA = new Date(a.dataDeIncorporacao);
         const dateB = new Date(b.dataDeIncorporacao);
         return orderParam === "desc" ? dateB - dateA : dateA - dateB;
      });
   }

   if (!agentes || agentes.length === 0) {
      return errorResponse(res, 404, "Nenhum agente encontrado");
   }
   res.status(200).json(agentes);
}

function getAgenteById(req, res) {
   const { id } = req.params;
   const agente = agentesRepository.findById(id);
   if (agente) {
      res.status(200).json(agente);
   } else {
      return errorResponse(res, 404, "Agente não encontrado", [
         { id: `O Agente com o id: ${id}. não existe` },
      ]);
   }
}

function createAgente(req, res) {
   const novoAgente = req.body;

   if (!isValidUUID(novoAgente.id)) {
      return errorResponse(res, 400, "O campo 'id' deve ser um UUID válido", [
         { id: "ID inválido" },
      ]);
   }
   if (!novoAgente.nome || novoAgente.nome.trim() === "") {
      return errorResponse(res, 400, "O campo 'nome' é obrigatório", [
         { nome: "Nome é obrigatório" },
      ]);
   }
   if (!isValidDate(novoAgente.dataDeIncorporacao)) {
      return errorResponse(
         res,
         400,
         "O campo 'dataDeIncorporacao' deve ser uma data válida no formato YYYY-MM-DD",
         [{ dataDeIncorporacao: "Data inválida" }]
      );
   }
   if (isFutureDate(novoAgente.dataDeIncorporacao)) {
      return errorResponse(
         res,
         400,
         "A data de incorporação não pode ser no futuro",
         [{ dataDeIncorporacao: "Data futura não permitida" }]
      );
   }
   if (!novoAgente.cargo || novoAgente.cargo.trim() === "") {
      return errorResponse(res, 400, "O campo 'cargo' é obrigatório", [
         { cargo: "Cargo é obrigatório" },
      ]);
   }

   try {
      agentesRepository.createAgente(novoAgente);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao criar agente", [
         { field: "body", message: error.message },
      ]);
   }
   res.status(201).json(novoAgente);
}

function updateAgente(req, res) {
   const { id } = req.params;
   const { id: newId, ...updatedAgente } = req.body;

   const agenteExiste = agentesRepository.findById(id);
   if (!agenteExiste) {
      return errorResponse(res, 404, "Agente não encontrado");
   }

   if (newId && newId !== id) {
      return errorResponse(res, 400, "Não é permitido alterar o ID do agente");
   }

   if (!updatedAgente.nome || updatedAgente.nome.trim() === "") {
      return errorResponse(res, 400, "O campo 'nome' é obrigatório", [
         { nome: "Nome é obrigatório" },
      ]);
   }
   if (!isValidDate(updatedAgente.dataDeIncorporacao)) {
      return errorResponse(
         res,
         400,
         "O campo 'dataDeIncorporacao' deve ser uma data válida no formato YYYY-MM-DD",
         [{ dataDeIncorporacao: "Data inválida" }]
      );
   }
   if (isFutureDate(updatedAgente.dataDeIncorporacao)) {
      return errorResponse(
         res,
         400,
         "A data de incorporação não pode ser no futuro",
         [{ dataDeIncorporacao: "Data futura não permitida" }]
      );
   }
   if (!updatedAgente.cargo || updatedAgente.cargo.trim() === "") {
      return errorResponse(res, 400, "O campo 'cargo' é obrigatório", [
         { cargo: "Cargo é obrigatório" },
      ]);
   }

   try {
      agentesRepository.updateAgente(id, updatedAgente);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao atualizar agente", [
         { field: "body", message: error.message },
      ]);
   }
   const agenteAtualizado = agentesRepository.findById(id);
   res.status(200).json(agenteAtualizado);
}

function deleteAgente(req, res) {
   const { id } = req.params;

   const agenteExiste = agentesRepository.findById(id);
   if (!agenteExiste) {
      return errorResponse(res, 404, "Agente não encontrado");
   }

   try {
      agentesRepository.deleteAgente(id);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao deletar agente", [
         { field: "id", message: error.message },
      ]);
   }
   res.status(204).send();
}

function patchAgente(req, res) {
   const { id } = req.params;
   const { id: newId, ...updatedFields } = req.body;

   const agenteExiste = agentesRepository.findById(id);
   if (!agenteExiste) {
      return errorResponse(res, 404, "Agente não encontrado");
   }

   if (newId && newId !== id) {
      return errorResponse(res, 400, "Não é permitido alterar o ID do agente");
   }

   if (updatedFields.nome !== undefined && updatedFields.nome.trim() === "") {
      return errorResponse(res, 400, "O campo 'nome' não pode ser vazio", [
         { nome: "Nome inválido" },
      ]);
   }
   if (updatedFields.dataDeIncorporacao !== undefined) {
      if (!isValidDate(updatedFields.dataDeIncorporacao)) {
         return errorResponse(
            res,
            400,
            "O campo 'dataDeIncorporacao' deve ser uma data válida no formato YYYY-MM-DD",
            [{ dataDeIncorporacao: "Data inválida" }]
         );
      }
      if (isFutureDate(updatedFields.dataDeIncorporacao)) {
         return errorResponse(
            res,
            400,
            "A data de incorporação não pode ser no futuro",
            [{ dataDeIncorporacao: "Data futura não permitida" }]
         );
      }
   }
   if (updatedFields.cargo !== undefined && updatedFields.cargo.trim() === "") {
      return errorResponse(res, 400, "O campo 'cargo' não pode ser vazio", [
         { cargo: "Cargo inválido" },
      ]);
   }

   try {
      agentesRepository.patchAgente(id, updatedFields);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao atualizar agente", [
         { field: "body", message: error.message },
      ]);
   }
   const agenteAtualizado = agentesRepository.findById(id);
   res.status(200).json(agenteAtualizado);
}

function getAgentesByCargo(req, res) {
   const { cargo } = req.params;
   const agentes = agentesRepository.getAgenteByCargo(cargo);
   if (!agentes || agentes.length === 0) {
      return errorResponse(res, 404, "Nenhum agente encontrado com este cargo");
   }
   res.status(200).json(agentes);
}

module.exports = {
   getAllAgentes,
   getAgenteById,
   createAgente,
   updateAgente,
   deleteAgente,
   patchAgente,
   getAgentesByCargo,
};
