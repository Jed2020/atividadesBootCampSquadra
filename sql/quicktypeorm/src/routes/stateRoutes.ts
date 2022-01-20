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
    response.json(await getRepository(stateModel).find());
});

stateRouter.get('/:nome_bairro', async (request, response) => {
    const repository = getCustomRepository(StateRepository);
    const res = await repository.findByName(request.params.nome_bairro);
    response.json(res);
  });

export default stateRouter;