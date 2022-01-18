import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import userModel from '../models/userModel';
import UserRepository from '../repositories/userRepository';

const userRouter = Router();

userRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(userModel);
        const res = await repo.save(request.body);
        return response.status(201).json(res);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
    }
}); 

userRouter.get('/', async (request, response) => {
    response.json(await getRepository(userModel).find());
});

userRouter.get('/:nome', async (request, response) => {
    const repository = getCustomRepository(UserRepository);
    const res = await repository.findByName(request.params.nome);
    response.json(res);
  });

export default userRouter;