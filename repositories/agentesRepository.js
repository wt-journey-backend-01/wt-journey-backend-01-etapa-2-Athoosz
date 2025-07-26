const agentes = [
   {
      id: "ad7076c1-2c25-45c2-b07c-bd043d777744",
      nome: "Rommel Carneiro",
      dataDeIncorporacao: "1992-10-04",
      cargo: "delegado",
   },
   {
      id: "900524cf-8a63-4d0b-94cc-8fe2b9973ea7",
      nome: "João da Silva",
      dataDeIncorporacao: "2010-05-15",
      cargo: "investigador",
   },
   {
      id: "1d1ad026-7a50-48b7-b0b3-c1719462cce5",
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
