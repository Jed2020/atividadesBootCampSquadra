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
        return response.status(400).json(errors);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(400).send({msg: "Erro nos dados."});
    }
}); 

stateRouter.get('/', async (request, response) => {
    const repository = await getRepository(stateModel).find();
    if (repository.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(repository);
});

stateRouter.get('/:sigla', async (request, response) => {
    const repository = getCustomRepository(StateRepository);
    const res = await repository.findOne(request.params.sigla);
    if (!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(res);
});


stateRouter.get('/:codigoUF', async (request, response) => {
    const repository = getCustomRepository(StateRepository);
    const res = await repository.findOne(request.params.codigoUF);
    if (!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(res);
});

stateRouter.put('/:codigoUF', async (request, response) => {
    const repository = getRepository(stateModel);
    const res = await repository.findOne(request.params.codigoUF);
    if (!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(stateModel).merge(res, request.body);
        const results = await getRepository(stateModel).save(res);
        return response.status(200).send(results);
    } 
});

stateRouter.delete("/:CodigoUF", async function(request, response) {
    const repository = getRepository(stateModel)
    const res = await repository.findOne(request.params.CodigoUF);
    if(!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        res.status = 2;
        const results = await getRepository(stateModel).save(res);
        return response.status(200).send(results);
    }
});

export default stateRouter;