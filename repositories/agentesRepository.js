const agentes = [
   {
      id: "e2b6e7e2-8e2a-4b7d-9e2a-1c3d4e5f6a7b",
      nome: "Rommel Carneiro",
      dataDeIncorporacao: "1992-10-04",
      cargo: "delegado",
   },
   {
      id: "a3c1e5b2-4b8d-4e2a-9d2e-2b3c4d5e6f7a",
      nome: "João da Silva",
      dataDeIncorporacao: "2010-05-15",
      cargo: "investigador",
   },
   {
      id: "b4d2e3c1-5a6b-4c8d-9e0f-1a2b3c4d5e6f",
      nome: "Maria Oliveira",
      dataDeIncorporacao: "2015-08-20",
      cargo: "perito",
   },
];

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
