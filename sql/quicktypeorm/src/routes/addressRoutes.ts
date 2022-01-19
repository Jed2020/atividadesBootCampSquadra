import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import addressModel from '../models/addressModel';
import AddressRepository from '../repositories/addressRepository';

const addressRouter = Router();

addressRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(addressModel);
        const res = await repo.save(request.body);
        return response.status(201).json(res);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
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