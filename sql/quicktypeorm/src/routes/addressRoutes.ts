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
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
}); 

addressRouter.get('/', async (request, response) => {

    const repository = new AddressRepository;
    
    if (request.query.codigoEndereco){        
        try{
        const res = await repository.findById(String(request.query.codigoEndereco));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Endereco com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.codigoBairro){        
        try{
        const res = await repository.findByIdDistrict(String(request.query.codigoBairro));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Endereco com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.codigoPessoa){        
        try{
        const res = await repository.findByIdUser(String(request.query.codigoPessoa));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Endereco com este codigo."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }}

    else if (request.query.nome){
        try{
        const res = await repository.findByName(String(request.query.nome));
        if (res.length === 0){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Endereco com este nome."});
        }
        response.status(200).json(res);
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }  
    }
    else {
        try {
            const res = await repository.findAll();
            if (res.length === 0) {
            return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
        }
        response.status(200).json(res);
        } catch (err) {
            return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."}); 
        } 
    };    
});

addressRouter.put('/:codigoEndereco', async (request, response) => {
    const repository = getRepository(addressModel)
    
    try {
        const res = await repository.findOne(request.params.codigoEndereco);
        if (!res){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhum Endereco com este codigo."});
        }else {
        getRepository(addressModel).merge(res, request.body);
        const results = await getRepository(addressModel).save(res);    
        const all = await getRepository(addressModel).find();
        return response.send(all);
        }
    } catch (err){
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
});

export default addressRouter;