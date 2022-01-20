import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import districtModel from '../models/districtModel';
import DistrictRepository from '../repositories/districtRepository';

const districtRouter = Router();

districtRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(districtModel);
        const {nome_bairro, status, Municipio_id} = request.body;

        const district = repo.create({
            nome_bairro, status, Municipio_id
        });
        const errors = await validate(district);

        if (errors.length === 0) {
            const res = await repo.save(district);
            return response.status(201).json(res);
        }
        return response.status(400).json(errors);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
    }
}); 

districtRouter.get('/', async (request, response) => {
    response.json(await getRepository(districtModel).find());
    return response.status(400).send({msg: "Erro nos dados."});
});

districtRouter.get('/:nome_bairro', async (request, response) => {
    const repository = getCustomRepository(DistrictRepository);
    const res = await repository.findByName(request.params.nome_bairro);
    response.json(res);
  });

export default districtRouter;