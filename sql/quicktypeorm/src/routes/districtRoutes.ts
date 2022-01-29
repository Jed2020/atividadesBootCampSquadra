import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import districtModel from '../models/districtModel';
import addressModel from '../models/addressModel';
import DistrictRepository from '../repositories/districtRepository';

const districtRouter = Router();

districtRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(districtModel);
        const {nome, status, codigoMunicipio} = request.body;
        const nameDistrict = await repo.findOne({
            where: { nome: request.body.nome}
        });
        const idCity = await repo.findOne({
            where: { codigoMunicipio: request.body.codigoMunicipio}
        });
        if (nameDistrict && idCity) {
            return response.status(404).send({status: 404, mensagem: "Existe um Bairro nsse Municipio no banco de dados."});
        }

        const district = repo.create({
            nome, status, codigoMunicipio
        });
        const errors = await validate(district);

        if (errors.length === 0) {
            const res = await repo.save(district);
            return response.status(201).json(res);
        }
        return response.status(404).json(errors);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
}); 

districtRouter.get('/', async (request, response) => {

    const repository = new DistrictRepository;
    
    if (request.query.codigoMunicipio){        
        try{
        const res = await repository.findByIdCity(String(request.query.codigoMunicipio));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Bairro com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.codigoBairro){        
        try{
        const res = await repository.findById(String(request.query.codigoBairro));
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Bairro com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.nome){
        try{
        const res = await repository.findByName(String(request.query.nome));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Bairro com este nome."});
        }
        response.status(200).json(res);
        } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}
    else {
        try {
            const res = await repository.findAll();
            if (res.length === 0) {
            return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
            }
            response.status(200).json(res);
        } catch (err){
            return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
        }        
    };    
});

districtRouter.put('/:codigoBairro', async (request, response) => {
    const repository = getRepository(districtModel)
    
    try {
        const res = await repository.findOne(request.params.codigoBairro);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Bairro com este codigo."});
        }
        getRepository(districtModel).merge(res, request.body);
        const results = await getRepository(districtModel).save(res);
        const all = await getRepository(districtModel).find();
        return response.send(all);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    } 
});

districtRouter.delete("/:codigoBairro", async function(request, response) {
    const repository = getRepository(districtModel);
    const repo = getRepository(addressModel);
    
    try {
        const res = await repository.findOne(request.params.codigoBairro);
        const idDistrict = await repo.findOne({
            where: { codigoBairro: request.params.codigoBairro}
        });
        
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Bairro com este codigo."});
        } else if (idDistrict) {
            return response.status(404).send({status: 404, mensagem: "O Bairro tem relacionamento com algum Endereco."});
        } else {
        res.status = 2;
        const results = await getRepository(districtModel).save(res);
        const all = await getRepository(districtModel).find();
        return response.send(all);
        }
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
});

export default districtRouter;