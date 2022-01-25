import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import cityModel from '../models/cityModel';
import CityRepository from '../repositories/cityRepository';

const cityRouter = Router();

cityRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(cityModel);
        const {nome, status, codigoUF} = request.body;

        const city = repo.create({
            nome, status, codigoUF
        });
        const errors = await validate(city);

        if (errors.length === 0) {
            const res = await repo.save(city);
            return response.status(201).json(res);
        }
        return response.status(404).json(errors); 
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(404).send({msg: "Erro nos dados."});
    }
}); 

cityRouter.get('/', async (request, response) => {
    const repository = await getRepository(cityModel).find();
    if (repository.length === 0) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(repository);
});

cityRouter.get('/:codigoUF', async (request, response) => {
    const repository = getRepository(cityModel);
    const res = await repository.findOne(request.params.codigoUF);
    if (!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(res);
});

cityRouter.get('/:codigoMunicipio', async (request, response) => {
    const repository = getRepository(cityModel);
    const res = await repository.findOne(request.params.codigoMunicipio);
    if (!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(res);
});

cityRouter.get('/:nome', async (request, response) => {
    const repository = getCustomRepository(CityRepository);
    const res = await repository.findByName(request.params.nome);
    if (!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(res);
});

cityRouter.put('/:codigoMunicipio', async (request, response) => {
    const repository = getRepository(cityModel)
    const res = await repository.findOne(request.params.codigoMunicipio);
    if (!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(cityModel).merge(res, request.body);
        const results = await getRepository(cityModel).save(res);
        return response.status(200).send(results);
    } 
});

cityRouter.delete("/:codigoMunicipio", async function(request, response) {
    const repository = getRepository(cityModel)
    const res = await repository.findOne(request.params.codigoMunicipio);
    if(!res) {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        res.status = 2;
        const results = await getRepository(cityModel).save(res);
        return response.status(200).send(results);
    }
});

export default cityRouter;