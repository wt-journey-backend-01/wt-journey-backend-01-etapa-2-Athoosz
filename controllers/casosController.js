const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { errorResponse } = require("../utils/errorHandler");
const { isValidUUID } = require("../utils/validators");

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

   const agenteExiste = agentesRepository.findById(novoCaso.agente_id);
   if (!agenteExiste) {
      return errorResponse(res, 404, "Agente não encontrado para o caso", [
         { agente_id: "Agente inexistente" },
      ]);
   }

   if (!isValidUUID(novoCaso.id)) {
      return errorResponse(res, 400, "O campo 'id' deve ser um UUID válido", [
         { id: "ID inválido" },
      ]);
   }

   if (!["aberto", "solucionado"].includes(novoCaso.status)) {
      return errorResponse(
         res,
         400,
         "O campo 'status' pode ser somente 'aberto' ou 'solucionado'",
         [{ status: "Status inválido" }]
      );
   }
   if (!novoCaso.titulo || novoCaso.titulo.trim() === "") {
      return errorResponse(res, 400, "O campo 'titulo' é obrigatório", [
         { field: "titulo", message: "Título é obrigatório" },
      ]);
   }
   if (!novoCaso.descricao || novoCaso.descricao.trim() === "") {
      return errorResponse(res, 400, "O campo 'descricao' é obrigatório", [
         { field: "descricao", message: "Descrição é obrigatória" },
      ]);
   }
   if (!novoCaso.agente_id || novoCaso.agente_id.trim() === "") {
      return errorResponse(res, 400, "O campo 'agente_id' é obrigatório", [
         { field: "agente_id", message: "ID do agente é obrigatório" },
      ]);
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

   if (updatedCaso.id && updatedCaso.id !== id) {
      return errorResponse(res, 400, "Não é permitido alterar o ID do caso");
   }

   const caso = casosRepository.findById(id);
   if (!caso) {
      return errorResponse(res, 404, "Caso não encontrado");
   }

   const agenteExiste = agentesRepository.findById(updatedCaso.agente_id);
   if (!agenteExiste) {
      return errorResponse(res, 404, "Agente não encontrado para o caso", [
         { agente_id: "Agente inexistente" },
      ]);
   }

   if (!isValidUUID(updatedCaso.id)) {
      return errorResponse(res, 400, "O campo 'id' deve ser um UUID válido", [
         { id: "ID inválido" },
      ]);
   }

   if (!["aberto", "solucionado"].includes(updatedCaso.status)) {
      return errorResponse(
         res,
         400,
         "O campo 'status' pode ser somente 'aberto' ou 'solucionado'",
         [{ status: "Status inválido" }]
      );
   }
   if (!updatedCaso.titulo || updatedCaso.titulo.trim() === "") {
      return errorResponse(res, 400, "O campo 'titulo' é obrigatório", [
         { field: "titulo", message: "Título é obrigatório" },
      ]);
   }
   if (!updatedCaso.descricao || updatedCaso.descricao.trim() === "") {
      return errorResponse(res, 400, "O campo 'descricao' é obrigatório", [
         { field: "descricao", message: "Descrição é obrigatória" },
      ]);
   }
   if (!updatedCaso.agente_id || updatedCaso.agente_id.trim() === "") {
      return errorResponse(res, 400, "O campo 'agente_id' é obrigatório", [
         { field: "agente_id", message: "ID do agente é obrigatório" },
      ]);
   }
   try {
      casosRepository.updateCaso(id, updatedCaso);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao atualizar caso", [
         { field: "body", message: error.message },
      ]);
   }
   res.status(200).json({ message: "Caso atualizado com sucesso" });
}

function patchCaso(req, res) {
   const { id } = req.params;
   const { id: newId, ...updatedFields } = req.body;

   if (newId && newId !== id) {
      return errorResponse(res, 400, "Não é permitido alterar o ID do caso");
   }

   const caso = casosRepository.findById(id);
   if (!caso) {
      return errorResponse(res, 404, "Caso não encontrado");
   }

   if (
      updatedFields.titulo !== undefined &&
      updatedFields.titulo.trim() === ""
   ) {
      return errorResponse(res, 400, "O campo 'titulo' não pode ser vazio", [
         { titulo: "Título inválido" },
      ]);
   }
   if (
      updatedFields.descricao !== undefined &&
      updatedFields.descricao.trim() === ""
   ) {
      return errorResponse(res, 400, "O campo 'descricao' não pode ser vazio", [
         { descricao: "Descrição inválida" },
      ]);
   }
   if (
      updatedFields.status !== undefined &&
      !["aberto", "solucionado"].includes(updatedFields.status)
   ) {
      return errorResponse(
         res,
         400,
         "O campo 'status' deve ser 'aberto' ou 'solucionado'",
         [{ status: "Status inválido" }]
      );
   }
   if (updatedFields.agente_id !== undefined) {
      if (!updatedFields.agente_id || updatedFields.agente_id.trim() === "") {
         return errorResponse(
            res,
            400,
            "O campo 'agente_id' não pode ser vazio",
            [{ agente_id: "Agente_id inválido" }]
         );
      }
      const agenteExiste = agentesRepository.findById(updatedFields.agente_id);
      if (!agenteExiste) {
         return errorResponse(res, 400, "O agente_id informado não existe", [
            { agente_id: "Agente não encontrado" },
         ]);
      }
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

   const caso = casosRepository.findById(id);
   if (!caso) {
      return errorResponse(res, 404, "Caso não encontrado");
   }

   try {
      casosRepository.deleteCaso(id);
   } catch (error) {
      return errorResponse(res, 400, "Erro ao deletar caso", [
         { field: "id", message: error.message },
      ]);
   }
   res.status(204).send();
}

function getCasosByAgenteId(req, res) {
   const { uuid } = req.query;

   if (!uuid || !isValidUUID(uuid)) {
      return errorResponse(
         res,
         400,
         "A query string 'uuid' deve ser um UUID válido"
      );
   }
  
   const casos = casosRepository.findByAgenteId(uuid);
   if (!casos || casos.length === 0) {
      return errorResponse(res, 404, "Nenhum caso encontrado para este agente");
   }
   res.status(200).json(casos);
}

function getCasosByStatus(req, res) {
   const { status } = req.query;
   if (!status || typeof status !== "string" || status.trim() === "") {
      return errorResponse(
         res,
         400,
         "A query string 'status' é obrigatória para pesquisa"
      );
   }
   const casos = casosRepository.findByStatus(status);
   if (!casos || casos.length === 0) {
      return errorResponse(res, 404, "Nenhum caso encontrado com este status");
   }
   res.status(200).json(casos);
}

function getCasosByTituloOrDescricao(req, res) {
   const { q } = req.query;
   if (!q || typeof q !== "string" || q.trim() === "") {
      return errorResponse(
         res,
         400,
         "A query string 'q' é obrigatória para pesquisa"
      );
   }
   const casos = casosRepository.findByTituloOrDescricao(q);
   if (!casos || casos.length === 0) {
      return errorResponse(
         res,
         404,
         "Nenhum caso encontrado com este título ou descrição"
      );
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
   getCasosByAgenteId,
   getCasosByStatus,
   getCasosByTituloOrDescricao,
};
