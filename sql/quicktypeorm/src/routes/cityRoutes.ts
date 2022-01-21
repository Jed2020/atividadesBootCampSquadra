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
    const repository = await getRepository(cityModel).find();
    if (repository.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(repository);
});

cityRouter.get('/:nome_cidade', async (request, response) => {
    const repository = getCustomRepository(CityRepository);
    const res = await repository.findByName(request.params.nome_cidade);
    if (res.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(res);
});

cityRouter.put('/:Municipio_id', async (request, response) => {
    const repository = getRepository(cityModel)
    const res = await repository.findOne(request.params.Municipio_id);
    if (!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(cityModel).merge(res, request.body);
        const results = await getRepository(cityModel).save(res);
        return response.send(results);
    } 
});

cityRouter.delete("/:Municipio_id", async function(request, response) {
    const repository = getRepository(cityModel)
    const res = await repository.findOne(request.params.Municipio_id);
    if(!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        res.status = 2;
        const results = await getRepository(cityModel).save(res);
        return response.send(results);
    }
});

export default cityRouter;