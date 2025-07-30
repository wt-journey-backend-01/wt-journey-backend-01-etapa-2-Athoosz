const casos = [];

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
