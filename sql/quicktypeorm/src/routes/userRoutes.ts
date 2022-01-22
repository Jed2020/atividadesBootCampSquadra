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
    const repository = await getRepository(userModel).find();
    if (repository.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(repository);
});

userRouter.get('/:nome', async (request, response) => {
    const repository = getCustomRepository(UserRepository);
    const res = await repository.findByName(request.params.nome);
    if (res.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.json(res);
});

userRouter.put('/:Pessoa_id', async (request, response) => {
    const repository = getRepository(userModel)
    const res = await repository.findOne(request.params.Pessoa_id);
    if (!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(userModel).merge(res, request.body);
        const results = await getRepository(userModel).save(res);
        return response.send(results);
    } 
});

userRouter.delete("/:Pessoa_id", async function(request, response) {
    const repository = getRepository(userModel)
    const res = await repository.findOne(request.params.Pessoa_id);
    if(!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        res.status = 2;
        const results = await getRepository(userModel).save(res);
        return response.send(results);
    }
});

export default userRouter;  