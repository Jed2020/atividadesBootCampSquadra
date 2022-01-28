import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import stateModel from '../models/stateModel';
import StateRepository from '../repositories/stateRepository';


const stateRouter = Router();

stateRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(stateModel);
        const {sigla, nome, status} = request.body;

        const state = repo.create({
            sigla, nome, status
        });

        const errors = await validate(state);

        if (errors.length === 0) {
            const res = await repo.save(state);
            return response.status(201).json(res);
        }
        return response.status(404).json(errors);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
}); 

stateRouter.get('/', async (request, response) => {

    const repository = new StateRepository;
    
    if (request.query.codigoUF){        
        try{
        const res = await repository.findById(String(request.query.codigoUF));
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma UF com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.sigla){
        try{
        const res = await repository.findBySigla(String(request.query.sigla));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma UF com esta sigla."});
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


stateRouter.put('/:codigoUF', async (request, response) => {
    const repository = getRepository(stateModel);
    
    try {
        const res = await repository.findOne(request.params.codigoUF);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma UF com este codigo."});
        }
        getRepository(stateModel).merge(res, request.body);
        const results = await getRepository(stateModel).save(res);
        return response.status(200).send(results);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    } 
});

stateRouter.delete("/:CodigoUF", async function(request, response) {
    const repository = getRepository(stateModel)
    
    try {
        const res = await repository.findOne(request.params.CodigoUF);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma UF com este codigo."});
        }
        res.status = 2;
        const results = await getRepository(stateModel).save(res);
        return response.status(200).send(results);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
});

export default stateRouter;