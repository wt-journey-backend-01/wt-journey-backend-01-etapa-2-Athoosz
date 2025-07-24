const agentes = [
   {
      id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
      nome: "Rommel Carneiro",
      dataDeIncorporacao: "1992/10/04",
      cargo: "delegado",
   },
   {
      id: "12345678-1234-5678-1234-567812345678",
      nome: "João da Silva",
      dataDeIncorporacao: "2010/05/15",
      cargo: "investigador",
   },
   {
      id: "87654321-4321-8765-4321-876543218765",
      nome: "Maria Oliveira",
      dataDeIncorporacao: "2015/08/20",
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
   return agentes.filter((agente) => agente.cargo.toLowerCase() === cargo.toLowerCase());
}

module.exports = {
   findAll,
   findById,
   createAgente,
   updateAgente,
   patchAgente,
   deleteAgente,
   getAgenteByCargo,
};
