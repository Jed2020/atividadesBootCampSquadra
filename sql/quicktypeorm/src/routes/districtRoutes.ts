import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import districtModel from '../models/districtModel';
import DistrictRepository from '../repositories/districtRepository';

const districtRouter = Router();

districtRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(districtModel);
        const res = await repo.save(request.body);
        return response.status(201).json(res);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
    }
}); 

districtRouter.get('/', async (request, response) => {
    response.json(await getRepository(districtModel).find());
});

districtRouter.get('/:nome_bairro', async (request, response) => {
    const repository = getCustomRepository(DistrictRepository);
    const res = await repository.findByName(request.params.nome_bairro);
    response.json(res);
  });

export default districtRouter;