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
        return response.status(404).json(errors);        
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(404).send({status: 404, mensagem: "Não existe nenhuma Pessoa com este dados."});
    }
}); 

userRouter.get('/', async (request, response) => {

    const repository = new UserRepository;
    
    if (request.query.codigoPessoa){        
        try{
        const res = await repository.findById(String(request.query.codigoPessoa));
        if (res.length === 0){
            throw new Error("");
        }
        response.status(200).json(res);
    }catch {
        return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este codigo."});
    }}

    else if (request.query.nome){
        try{
        const res = await repository.findByName(String(request.query.nome));
        if (res.length === 0){
            throw new Error("");
        }
        response.status(200).json(res);
        }catch{
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este nome."});
        }  
    }
    else {
        const res = await repository.findAll();
    if (res.length === 0) {
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
    response.status(200).json(res);
    };    
});

userRouter.put('/:codigoPessoa', async (request, response) => {
    const repository = getRepository(userModel);
    const res = await repository.findOne(request.params.codigoPessoa);
    try {
        if (!res){
            throw new Error("");
        }
        getRepository(userModel).merge(res, request.body);
        const results = await getRepository(userModel).save(res);
        return response.send(results);        
    } catch {
        return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este codigo."});
    }
});

userRouter.delete("/:codigoPessoa", async function(request, response) {
    const repository = getRepository(userModel)
    const res = await repository.findOne(request.params.codigoPessoa);
    try {
        if (!res){
            throw new Error("");
        }
        res.status = 2;
        const results = await getRepository(userModel).save(res);
        return response.send(results);
    } catch {
        return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este codigo."});
    }
});

export default userRouter;  