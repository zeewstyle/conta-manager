enum eTipoTransacao {
    credito = 1,
    debito = 2
};

type Transacao = {
    operacao: Item,
    valor: number,
    banco: Item
}

type Item = {
    codigo: number,
    descricao: string
}

export {
    Transacao,
    eTipoTransacao,
    Item
}