const casosRepository = require("../repositories/casosRepository");
const { errorResponse } = require("../utils/errorHandler");

function getAllCasos(req, res) {
   const casos = casosRepository.findAll();
   if (!casos || casos.length === 0) {
      return errorResponse(res, 404, "Nenhum caso encontrado");
   }
   res.status(200).json(casos);
}

function getCasoById(req, res) {
   const { id } = req.params;
   const caso = casosRepository.findById(id);
   if (caso) {
      res.status(200).json(caso);
   } else {
      return errorResponse(res, 404, "Caso não encontrado", [
         { id: `O Caso com o id: ${id}. não existe` },
      ]);
   }
}

function createCaso(req, res) {
   const novoCaso = req.body;

   if (!["aberto", "solucionado"].includes(novoCaso.status)) {
      return errorResponse(
         res,
         400,
         "O campo 'status' pode ser somente 'aberto' ou 'solucionado'",
         [{ status: "Status inválido" }]
      );
   }
   try {
      casosRepository.addCaso(novoCaso);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao criar caso", [
         { field: "body", message: error.message },
      ]);
   }
   res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
   const { id } = req.params;
   const updatedCaso = req.body;

   if (!["aberto", "solucionado"].includes(novoCaso.status)) {
      return errorResponse(
         res,
         400,
         "O campo 'status' pode ser somente 'aberto' ou 'solucionado'",
         [{ status: "Status inválido" }]
      );
   }
   try {
      casosRepository.putCaso(id, updatedCaso);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao atualizar caso", [
         { field: "body", message: error.message },
      ]);
   }
   res.status(200).json({ message: "Caso atualizado com sucesso" });
}

function patchCaso(req, res) {
   const { id } = req.params;
   const updatedFields = req.body;

   if (!["aberto", "solucionado"].includes(novoCaso.status)) {
      return errorResponse(
         res,
         400,
         "O campo 'status' pode ser somente 'aberto' ou 'solucionado'",
         [{ status: "Status inválido" }]
      );
   }
   try {
      casosRepository.patchCaso(id, updatedFields);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao atualizar caso", [
         { field: "body", message: error.message },
      ]);
   }
   res.status(200).json({ message: "Caso atualizado com sucesso" });
}

function deleteCaso(req, res) {
   const { id } = req.params;
   try {
      casosRepository.deleteCaso(id);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao deletar caso", [
         { field: "id", message: error.message },
      ]);
   }
   res.status(204).json({ message: "Caso deletado com sucesso" });
}

function getCasosByAgentId(req, res) {
   const { uuid } = req.query;
   if (!uuid || typeof uuid !== "string" || uuid.trim() === "") {
      return errorResponse(res, 400, "A query string 'uuid' é obrigatória para pesquisa");
   }
   const casos = casosRepository.casoAgentId(uuid);
   if (!casos || casos.length === 0) {
      return errorResponse(res, 404, "Nenhum caso encontrado para este agente");
   }
   res.status(200).json(casos);
}

function getCasosByStatus(req, res) {
   const { status } = req.query;
   if (!status || typeof status !== "string" || status.trim() === "") {
      return errorResponse(res, 400, "A query string 'status' é obrigatória para pesquisa");
   }
   const casos = casosRepository.casoByStatus(status);
   if (!casos || casos.length === 0) {
      return errorResponse(res, 404, "Nenhum caso encontrado com este status");
   }
   res.status(200).json(casos);
}

function getCasosByTitleOrDescription(req, res) {
   const { q } = req.query;
   if (!q || typeof q !== "string" || q.trim() === "") {
      return errorResponse(res, 400, "A query string 'q' é obrigatória para pesquisa");
   }
   const casos = casosRepository.casoByTitleOrDescription(q);
   if (!casos || casos.length === 0) {
      return errorResponse(res, 404, "Nenhum caso encontrado com este título ou descrição");
   }
   res.status(200).json(casos);
}

module.exports = {
   getAllCasos,
   getCasoById,
   createCaso,
   updateCaso,
   patchCaso,
   deleteCaso,
   getCasosByAgentId,
   getCasosByStatus,
   getCasosByTitleOrDescription
};
