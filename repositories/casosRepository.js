const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1" 
    
    },
    {
        id: "a2b3c4d5-e6f7-8g9h-0i1j-2k3l4m5n6o7p",
        titulo: "furto",
        descricao: "Relato de furto de veículo na madrugada do dia 15/08/2021 no bairro Centro.",
        status: "solucionado",
        agente_id: "12345678-1234-5678-1234-567812345678"
    },
    {
        id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6",
        titulo: "roubo",
        descricao: "Roubo a mão armada ocorrido no dia 20/09/2022 no bairro Jardim.",
        status: "aberto",
        agente_id: "23456789-2345-6789-2345-678923456789"
    }
]

function findAll() {
    return casos
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function addCaso(caso) {
    casos.push(caso);
}

function putCaso(id, updatedCaso) {
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

function findByAgentId(query) {
    const q = query.toLowerCase();
    return casos.filter(caso => caso.agente_id.toLowerCase().includes(q));
}

function findByStatus(query) {
    const q = query.toLowerCase();
    return casos.filter(caso => caso.status.toLowerCase().includes(q));
}

function findByTitleOrDescription(query) {
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
    findByAgentId,
    addCaso,
    putCaso,
    patchCaso,
    deleteCaso,
    findByStatus,
    findByTitleOrDescription
}
