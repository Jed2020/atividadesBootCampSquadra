import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import addressModel from '../models/addressModel';
import AddressRepository from '../repositories/addressRepository';

const addressRouter = Router();

addressRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(addressModel);
        const {nome, numero, complemento, cep, codigoBairro, codigoPessoa} = request.body;

        const address = repo.create({
            nome, numero, complemento, cep, codigoBairro, codigoPessoa
        });
        const errors = await validate(address);

        if (errors.length === 0) {
            const res = await repo.save(address);
            return response.status(201).json(res);
        }
        return response.status(400).json(errors);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(400).send({msg: "Erro nos dados."});
    }
}); 

addressRouter.get('/', async (request, response) => {
    const repository = await getRepository(addressModel).find();
    if (repository.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(repository);
});

addressRouter.get('/:nome', async (request, response) => {
    const repository = getCustomRepository(AddressRepository);
    const res = await repository.findByName(request.params.nome);
    if (res.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(res);
});

addressRouter.put('/:codigoEndereco', async (request, response) => {
    const repository = getRepository(addressModel)
    const res = await repository.findOne(request.params.codigoEndereco);
    if (!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(addressModel).merge(res, request.body);
        const results = await getRepository(addressModel).save(res);
        return response.send(results);
    } 
});

export default addressRouter;