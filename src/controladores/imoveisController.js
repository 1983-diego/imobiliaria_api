const bancodedados = require("../bancodedados")

const listarImoveis = (req, res) => {
    return res.json(bancodedados.imoveis);
}

const criarImovel = (req, res) => {
    let {tipo_imovel,
        area_total,
        area_util,
        quartos,
        banheiros,
        garagens,
        valor_iptu,
        valor_condominio,
        valor_imovel,
        detalhes_imovel,
        nome_proprietario,
        telefone_proprietario} = req.body;

    if (!tipo_imovel || !area_total || !area_util || !quartos || !banheiros || !garagens || !valor_iptu || !valor_condominio || !valor_imovel || !detalhes_imovel || !nome_proprietario || !telefone_proprietario) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios, vc pode digitar 0 caso não tenha a informação"})
    }

    let novoImovel = {
        id: bancodedados.imovelID++,
        imovel:{
        tipo_imovel: tipo_imovel,
        area_total: area_total,
        area_util: area_util,
        quartos: quartos,
        banheiros: banheiros,
        garagens: garagens,
        valor_iptu: valor_iptu,
        valor_condominio: valor_condominio,
        valor_imovel: valor_imovel,
        detalhes_imovel: detalhes_imovel,
        nome_proprietario: nome_proprietario,
        telefone_proprietario: telefone_proprietario
        }
    }
    
    bancodedados.imoveis.push(novoImovel);

    return res.status(201).send();
}


const atualizarImovel = (req, res) => {
    let {tipo_imovel,
        area_total,
        area_util,
        quartos,
        banheiros,
        garagens,
        valor_iptu,
        valor_condominio,
        valor_imovel,
        detalhes_imovel,
        nome_proprietario,
        telefone_proprietario} = req.body;
    
    let {id} = req.params;
    
    let encontrarImovel = bancodedados.imoveis.find((imovel) => {
        return Number(imovel.id) == Number(id);
    })
    
    if (!encontrarImovel) {
        return res.status(400).json({ mensagem: "Imóvel inexistente"})
    }
    
    encontrarImovel.imovel = {
        tipo_imovel,
        area_total,
        area_util,
        quartos,
        banheiros,
        garagens,
        valor_iptu,
        valor_condominio,
        valor_imovel,
        detalhes_imovel,
        nome_proprietario,
        telefone_proprietario
    };

    return res.status(201).send()
}

const deletarImovel = (req, res) => {
    const {id} = req.params;

    const encontrarImovel = bancodedados.imoveis.find((imovel) => {
        return Number(imovel.id) === Number(id)
    })

    if (!encontrarImovel) {
        return res.status(404).json({ mensagem: "Imovel inexistente"})
    }

    bancodedados.imoveis = bancodedados.imoveis.filter((imovel) => {
        return Number(imovel.id) !== Number(id)
    })

    return res.status(203).json();
}

module.exports = {
    listarImoveis,
    criarImovel,
    atualizarImovel,
    deletarImovel
}