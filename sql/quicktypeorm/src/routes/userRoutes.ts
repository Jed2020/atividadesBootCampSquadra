import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import userModel from '../models/userModel';
import UserRepository from '../repositories/userRepository';
import AddressRepository from '../repositories/addressRepository';
import DistrictRepository from '../repositories/districtRepository';
import CityRepository from '../repositories/cityRepository';
import StateRepository from '../repositories/stateRepository';


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
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
}); 

userRouter.get('/', async (request, response) => {

    const repository = new UserRepository;
    const addressrepo = new AddressRepository;
    const districtrepo = new DistrictRepository;
    const cityrepo = new CityRepository;
    const staterepo = new StateRepository;
    
    if (request.query.codigoPessoa){        
        try{
        const res = await repository.findByIds(String(request.query.codigoPessoa));
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}        
       
    else if (request.query.nome){
        try{
        const res = await repository.findByName(String(request.query.nome));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este nome."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else {
        try {
            const res = await repository.findAll();
            if (res.length === 0) {
                return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
            }
            response.status(200).json(res);  
        } catch (err){
            return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
        }
    };    
});

userRouter.put('/:codigoPessoa', async (request, response) => {
    const repository = getRepository(userModel);
    
    try {
        const res = await repository.findOne(request.params.codigoPessoa);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este codigo."});
        }
        getRepository(userModel).merge(res, request.body);
        await getRepository(userModel).save(res);
        const all = await getRepository(userModel).find();
        return response.send(all);        
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
});

userRouter.delete("/:codigoPessoa", async function(request, response) {
    const repository = getRepository(userModel)
    
    try {
        const res = await repository.findOne(request.params.codigoPessoa);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este codigo."});
        }
        res.status = 2;
        const results = await getRepository(userModel).save(res);
        const all = await getRepository(userModel).find();
        return response.send(all);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
});

export default userRouter;  