const agentesRepository = require("../repositories/agentesRepository");
const { errorResponse } = require("../utils/errorHandler");

function getAllAgentes(req, res) {
   const agentes = agentesRepository.findAll();
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
   const updatedAgente = req.body;
   try {
      agentesRepository.updateAgente(id, updatedAgente);
   } catch (error) {
     return errorResponse(res, 400, "Erro ao atualizar agente", [
         { field: "body", message: error.message },
      ]);
   }
   res.status(200).json({ message: "Agente atualizado com sucesso" });
}

function deleteAgente(req, res) {
   const { id } = req.params;
   try {
      agentesRepository.deleteAgente(id);
   } catch (error) {
     return errorResponse(res, 400, "Erro ao deletar agente", [
         { field: "id", message: error.message },
      ]);
   }
   res.status(204).json({ message: "Agente deletado com sucesso" });
}

function patchAgente(req, res) {
   const { id } = req.params;
   const updatedFields = req.body;
   try {
      agentesRepository.patchAgente(id, updatedFields);
   } catch (error) {
     return errorResponse(res, 400, "Erro ao atualizar agente", [
         { field: "body", message: error.message },
      ]);
   }
   res.status(200).json({ message: "Agente atualizado com sucesso" });
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
   getAgentesByCargo
};
