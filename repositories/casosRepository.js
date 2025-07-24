const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "b7e3a1c2-4d5f-4f8a-9e2a-1c3d4e5f6a7b" 
    },
    {
        id: "e1d2c3b4-a5f6-4e7d-8c9b-0a1b2c3d4e5f",
        titulo: "furto",
        descricao: "Relato de furto de veículo na madrugada do dia 15/08/2021 no bairro Centro.",
        status: "solucionado",
        agente_id: "b7e3a1c2-4d5f-4f8a-9e2a-1c3d4e5f6a7b"
    },
    {
        id: "a7b8c9d0-e1f2-4a3b-8c7d-6e5f4a3b2c1d",
        titulo: "roubo",
        descricao: "Roubo a mão armada ocorrido no dia 20/09/2022 no bairro Jardim.",
        status: "aberto",
        agente_id: "a2f4c6e8-1b3d-4f5a-8c7e-9d0b1a2c3e4f"
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
    const q = query.toLowerCase();
    return casos.filter(caso => caso.agente_id.toLowerCase().includes(q));
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
