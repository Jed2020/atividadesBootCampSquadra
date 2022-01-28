import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import cityModel from '../models/cityModel';
import CityRepository from '../repositories/cityRepository';

const cityRouter = Router();

cityRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(cityModel);
        const {nome, status, codigoUF} = request.body;

        const city = repo.create({
            nome, status, codigoUF
        });
        const errors = await validate(city);

        if (errors.length === 0) {
            const res = await repo.save(city);
            return response.status(201).json(res);
        }
        return response.status(404).json(errors); 
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
}); 

cityRouter.get('/', async (request, response) => {

    const repository = new CityRepository;
    
    if (request.query.codigoMunicipio){        
        try{
        const res = await repository.findById(String(request.query.codigoMunicipio));
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Municipio com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.codigoUF){        
        try{
        const res = await repository.findByIdUF(String(request.query.codigoUF));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Municipio com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.nome){
        try{
        const res = await repository.findByName(String(request.query.nome));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Municipio com este nome."});
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
    }        
});

cityRouter.put('/:codigoMunicipio', async (request, response) => {
    const repository = getRepository(cityModel)
    
    try {
        const res = await repository.findOne(request.params.codigoMunicipio);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Municipio com este codigo."});
        }
        getRepository(cityModel).merge(res, request.body);
        const results = await getRepository(cityModel).save(res);
        const all = await getRepository(cityModel).find();
        return response.send(all);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    } 
});

cityRouter.delete("/:codigoMunicipio", async function(request, response) {
    const repository = getRepository(cityModel)
    
    try {
        const res = await repository.findOne(request.params.codigoMunicipio);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Municipio com este codigo."});
        }
        res.status = 2;
        const results = await getRepository(cityModel).save(res);
        const all = await getRepository(cityModel).find();
        return response.send(all);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
});

export default cityRouter;