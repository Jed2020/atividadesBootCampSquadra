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
        return response.status(404).send({status: 404, mensagem: "Erro nos dados informados."});
    }
}); 

addressRouter.get('/', async (request, response) => {

    const repository = new AddressRepository;
    
    if (request.query.codigoEndereco){        
        try{
        const res = await repository.findById(String(request.query.codigoEndereco));
        if (res.length === 0){
            throw new Error("");
        }
        response.status(200).json(res);
    }catch {
        return response.status(404).send({status: 404, mensagem: "Não existe nenhum Endereco com este dados."});
    }}

    else if (request.query.codigoBairro){        
        try{
        const res = await repository.findByIdDistrict(String(request.query.codigoBairro));
        if (res.length === 0){
            throw new Error("");
        }
        response.status(200).json(res);
    }catch {
        return response.status(404).send({status: 404, mensagem: "Não existe nenhum Endereco com este dados."});
    }}

    else if (request.query.codigoPessoa){        
        try{
        const res = await repository.findByIdUser(String(request.query.codigoPessoa));
        if (res.length === 0){
            throw new Error("");
        }
        response.status(200).json(res);
    }catch {
        return response.status(404).send({status: 404, mensagem: "Não existe nenhum Endereco com este dados."});
    }}

    else if (request.query.nome){
        try{
        const res = await repository.findByName(String(request.query.nome));
        if (res.length === 0){
            throw new Error("");
        }
        response.status(200).json(res);
        }catch{
            return response.status(404).send({status: 404, mensagem: "Não existe nenhum Endereco com este dados."});
        }  
    }
    else {
        const res = await repository.findAll();
    if (res.length === 0) {
        return response.status(404).send({status: 404, mensagem: "Não existe nenhum Endereco com este dados."});
    }
    response.status(200).json(res);
    };    
});

addressRouter.put('/:codigoEndereco', async (request, response) => {
    const repository = getRepository(addressModel)
    const res = await repository.findOne(request.params.codigoEndereco);
    try {
        if (!res){
            throw new Error("");
        }
        getRepository(addressModel).merge(res, request.body);
        const results = await getRepository(addressModel).save(res);
        return response.send(results);
    } catch {
        return response.status(404).send({status: 404, mensagem: "Não existe nenhum Endereco com este dados."});
    }
});

export default addressRouter;