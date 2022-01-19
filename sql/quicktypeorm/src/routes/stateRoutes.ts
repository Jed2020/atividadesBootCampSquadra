import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import stateModel from '../models/stateModel';
import StateRepository from '../repositories/stateRepository';

const stateRouter = Router();

stateRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(stateModel);
        const res = await repo.save(request.body);
        return response.status(201).json(res);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
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