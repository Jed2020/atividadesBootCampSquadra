import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import districtModel from '../models/districtModel';
import DistrictRepository from '../repositories/districtRepository';

const districtRouter = Router();

districtRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(districtModel);
        const {nome, status, codigoMunicipio} = request.body;

        const district = repo.create({
            nome, status, codigoMunicipio
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
    const repository = await getRepository(districtModel).find();
    if (repository.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(repository);
});

districtRouter.get('/:nome', async (request, response) => {
    const repository = getCustomRepository(DistrictRepository);
    const res = await repository.findByName(request.params.nome);
    if (res.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(res);
});

districtRouter.put('/:codigoBairro', async (request, response) => {
    const repository = getRepository(districtModel)
    const res = await repository.findOne(request.params.codigoBairro);
    if (!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(districtModel).merge(res, request.body);
        const results = await getRepository(districtModel).save(res);
        return response.send(results);
    } 
});

districtRouter.delete("/:codigoBairro", async function(request, response) {
    const repository = getRepository(districtModel)
    const res = await repository.findOne(request.params.codigoBairro);
    if(!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        res.status = 2;
        const results = await getRepository(districtModel).save(res);
        return response.send(results);
    }
});

export default districtRouter;