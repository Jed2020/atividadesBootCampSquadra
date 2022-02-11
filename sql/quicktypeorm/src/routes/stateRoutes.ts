import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import stateModel from '../models/stateModel';
import cityModel from '../models/cityModel';
import StateRepository from '../repositories/stateRepository';


const stateRouter = Router();

stateRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(stateModel);
        const {sigla, nome, status} = request.body;
        const nameSigla = await repo.findOne({
            where: { sigla: request.body.sigla}
        });
        if (nameSigla){
            return response.status(404).send({status: 404, mensagem: "Existe uma UF com essa sigla no banco de dados."});
        }
        const state = repo.create({
            sigla, nome, status
        });

        const errors = await validate(state);
        
        if (errors.length === 0) {
            const res = await repo.save(state);
            const all = await getRepository(stateModel).find();
            return response.status(201).send(all);
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
        if (!res){
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


stateRouter.put('/', async (request, response) => {
    const repository = getRepository(stateModel);
    
    try {
        const res = await repository.findOne(request.body.codigoUF);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma UF com este codigo."});
        }
        getRepository(stateModel).merge(res, request.body);
        const results = await getRepository(stateModel).save(res);
        const all = await getRepository(stateModel).find();
        return response.send(all);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    } 
});

stateRouter.delete("/:codigoUF", async function(request, response) {
    const repository = getRepository(stateModel);
    const repo = getRepository(cityModel);
    
    try {
        const res = await repository.findOne(request.params.codigoUF);
        const idCity = await repo.findOne({
            where: { codigoUF: request.params.codigoUF}
        });
          
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma UF com este codigo."});
        } else if (idCity) {
            return response.status(404).send({status: 404, mensagem: "A UF tem relacionamento com algum Municipio."});
        } else {
            res.status = 2;
            const results = await getRepository(stateModel).save(res);
            const all = await getRepository(stateModel).find();
            return response.send(all);
        }
        
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
});

export default stateRouter;