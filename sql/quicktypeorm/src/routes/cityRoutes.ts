import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import cityModel from '../models/cityModel';
import CityRepository from '../repositories/cityRepository';

const cityRouter = Router();

cityRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(cityModel);
        const res = await repo.save(request.body);
        return response.status(201).json(res);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
    }
}); 

cityRouter.get('/', async (request, response) => {
    response.json(await getRepository(cityModel).find());
});

cityRouter.get('/:nome_municipio', async (request, response) => {
    const repository = getCustomRepository(CityRepository);
    const res = await repository.findByName(request.params.nome_municipio);
    response.json(res);
  });

export default cityRouter;