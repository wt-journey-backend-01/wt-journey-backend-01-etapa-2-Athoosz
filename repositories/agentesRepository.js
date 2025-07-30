const agentes = [];

function findAll() {
   return agentes;
}

function findById(id) {
   return agentes.find((agente) => agente.id === id);
}

function createAgente(agente) {
   agentes.push(agente);
}

function updateAgente(id, updatedAgente) {
   const index = agentes.findIndex((agente) => agente.id === id);
   if (index !== -1) {
      const { id: _, ...rest } = updatedAgente;
      agentes[index] = { ...agentes[index], ...rest };
   }
}

function patchAgente(id, updatedFields) {
   const agente = findById(id);
   if (agente) {
      Object.assign(agente, updatedFields);
   }
}

function deleteAgente(id) {
   const index = agentes.findIndex((agente) => agente.id === id);
   if (index !== -1) {
      agentes.splice(index, 1);
   }
}

function getAgenteByCargo(cargo) {
   return agentes.filter(
      (agente) => agente.cargo.toLowerCase() === cargo.toLowerCase()
   );
}

function findAllSortedByDataDeIncorporacao(order = "asc") {
   return [...agentes].sort((a, b) => {
      const dateA = new Date(a.dataDeIncorporacao);
      const dateB = new Date(b.dataDeIncorporacao);
      return order === "desc" ? dateB - dateA : dateA - dateB;
   });
}

function findByDataDeIncorporacaoRange(start, end) {
   const startDate = new Date(start);
   const endDate = new Date(end);
   return agentes.filter((a) => {
      const date = new Date(a.dataDeIncorporacao);
      return date >= startDate && date <= endDate;
   });
}

module.exports = {
   findAll,
   findById,
   createAgente,
   updateAgente,
   patchAgente,
   deleteAgente,
   getAgenteByCargo,
   findAllSortedByDataDeIncorporacao,
   findByDataDeIncorporacaoRange,
};
