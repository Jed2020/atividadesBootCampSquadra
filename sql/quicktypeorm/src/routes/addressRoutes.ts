import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import addressModel from '../models/addressModel';
import AddressRepository from '../repositories/addressRepository';

const addressRouter = Router();

addressRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(addressModel);
        const {nome_rua, numero, complemento, cep, Bairro_id, Pessoa_id} = request.body;

        const address = repo.create({
            nome_rua, numero, complemento, cep, Bairro_id, Pessoa_id
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
    response.json(await getRepository(addressModel).find());
});

addressRouter.get('/:nome_endereco', async (request, response) => {
    const repository = getCustomRepository(AddressRepository);
    const res = await repository.findByName(request.params.nome_endereco);
    response.json(res);
  });

export default addressRouter;