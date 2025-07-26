const casos = [
    {
        id: "1c3a05d5-5dc6-446c-a806-a3dfa3346c63",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "1d1ad026-7a50-48b7-b0b3-c1719462cce5"
    },
    {
        id: "162f30b7-1b46-4a5f-b96a-bcf35a90557d",
        titulo: "furto",
        descricao: "Relato de furto de veículo na madrugada do dia 15/08/2021 no bairro Centro.",
        status: "solucionado",
        agente_id: "ad7076c1-2c25-45c2-b07c-bd043d777744"
    },
    {
        id: "ae1c0b87-6125-4e10-8194-0bd1dfad99ea",
        titulo: "roubo",
        descricao: "Roubo a mão armada ocorrido no dia 20/09/2022 no bairro Jardim.",
        status: "aberto",
        agente_id: "ad7076c1-2c25-45c2-b07c-bd043d777744"
    }
];

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function addCaso(caso) {
    casos.push(caso);
}

function updateCaso(id, updatedCaso) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        const { id: _, ...rest } = updatedCaso;
        casos[index] = { ...casos[index], ...rest };
    }
}

function patchCaso(id, updatedFields) {
    const caso = findById(id);
    if (caso) {
        Object.assign(caso, updatedFields);
    }
}

function deleteCaso(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index !== -1) {
        casos.splice(index, 1);
    }
}

function findByAgenteId(query) {
    return casos.filter(caso => caso.agente_id === query);
}

function findByStatus(query) {
    const q = query.toLowerCase();
    return casos.filter(caso => caso.status.toLowerCase() === q);
}

function findByTituloOrDescricao(query) {
    const q = query.toLowerCase();
    return casos.filter(
        caso =>
            caso.titulo.toLowerCase().includes(q) ||
            caso.descricao.toLowerCase().includes(q)
    );
}

module.exports = {
    findAll,
    findById,
    findByAgenteId,
    addCaso,
    updateCaso,
    patchCaso,
    deleteCaso,
    findByStatus,
    findByTituloOrDescricao
};
