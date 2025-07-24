const agentes = [
   {
      id: "b7e3a1c2-4d5f-4f8a-9e2a-1c3d4e5f6a7b",
      nome: "Rommel Carneiro",
      dataDeIncorporacao: "1992-10-04",
      cargo: "delegado",
   },
   {
      id: "a2f4c6e8-1b3d-4f5a-8c7e-9d0b1a2c3e4f",
      nome: "João da Silva",
      dataDeIncorporacao: "2010-05-15",
      cargo: "investigador",
   },
   {
      id: "c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
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
      const dateA = new Date(a.dataDeIncorporacao.replace(/\//g, "-"));
      const dateB = new Date(b.dataDeIncorporacao.replace(/\//g, "-"));
      return order === "desc" ? dateB - dateA : dateA - dateB;
   });
}

function findByDataDeIncorporacaoRange(start, end) {
   const startDate = new Date(start);
   const endDate = new Date(end);
   return agentes.filter((a) => {
      const date = new Date(a.dataDeIncorporacao.replace(/\//g, "-"));
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
