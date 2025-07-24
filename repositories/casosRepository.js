const casos = [
    {
        id: "f1a2b3c4-5d6e-4f7a-8b9c-0d1e2f3a4b5c",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "e2b6e7e2-8e2a-4b7d-9e2a-1c3d4e5f6a7b"
    },
    {
        id: "e3d4c5b6-a7f8-4e9d-8c0b-1a2b3c4d5e6f",
        titulo: "furto",
        descricao: "Relato de furto de veículo na madrugada do dia 15/08/2021 no bairro Centro.",
        status: "solucionado",
        agente_id: "e2b6e7e2-8e2a-4b7d-9e2a-1c3d4e5f6a7b"
    },
    {
        id: "a8b9c0d1-e2f3-4a5b-8c7d-6e5f4a3b2c1d",
        titulo: "roubo",
        descricao: "Roubo a mão armada ocorrido no dia 20/09/2022 no bairro Jardim.",
        status: "aberto",
        agente_id: "a3c1e5b2-4b8d-4e2a-9d2e-2b3c4d5e6f7a"
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
    return casos.filter(caso => caso.status.toLowerCase().includes(q));
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
