import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import stateModel from '../models/stateModel';
import StateRepository from '../repositories/stateRepository';

const stateRouter = Router();

stateRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(stateModel);
        const {sigla, nome_estado, status} = request.body;

        const state = repo.create({
            sigla, nome_estado, status
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
    response.json(repository);
});

stateRouter.get('/:nome_estado', async (request, response) => {
    const repository = getCustomRepository(StateRepository);
    const res = await repository.findByName(request.params.nome_estado);
    if (res.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(res);
  });

stateRouter.put('/:UF_id', async (request, response) => {
    const repository = getRepository(stateModel)
    const res = await repository.findOne(request.params.UF_id);
    if (!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(stateModel).merge(res, request.body);
        const results = await getRepository(stateModel).save(res);
        return response.send(results);
    } 
});

stateRouter.delete("/:UF_id", async function(request, response) {
    const repository = getRepository(stateModel)
    const res = await repository.findOne(request.params.UF_id);
    if(!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        res.status = 2;
        const results = await getRepository(stateModel).save(res);
        return response.send(results);
    }
});

export default stateRouter;