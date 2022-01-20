import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import cityModel from '../models/cityModel';
import CityRepository from '../repositories/cityRepository';

const cityRouter = Router();

cityRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(cityModel);
        const {nome_cidade, status, UF_id} = request.body;

        const city = repo.create({
            nome_cidade, status, UF_id
        });
        const errors = await validate(city);

        if (errors.length === 0) {
            const res = await repo.save(city);
            return response.status(201).json(res);
        }
        return response.status(400).json(errors); 
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(400).send({msg: "Erro nos dados."});
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