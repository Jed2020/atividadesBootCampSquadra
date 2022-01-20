import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import userModel from '../models/userModel';
import UserRepository from '../repositories/userRepository';


const userRouter = Router();

userRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(userModel);
        const {nome, sobrenome, idade, login, senha, status} = request.body;

        const user = repo.create({
            nome, sobrenome, idade, login, senha, status
        });
        const errors = await validate(user);

        if (errors.length === 0) {
            const res = await repo.save(user);
            return response.status(201).json(res);
        }
        return response.status(400).json(errors);        
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(400).send({msg: "Erro nos dados."});
    }
}); 

userRouter.get('/', async (request, response) => {
    response.json(await getRepository(userModel).find());
});

userRouter.get('/:nome', async (request, response) => {
    const repository = getCustomRepository(UserRepository);
    const res = await repository.findByName(request.params.nome);
    if (!res) {
        throw new Error('User not found');
      }
    response.json(res);
});

export default userRouter;