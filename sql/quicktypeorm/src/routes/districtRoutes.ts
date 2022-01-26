import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import { validate } from 'class-validator';
import districtModel from '../models/districtModel';
import DistrictRepository from '../repositories/districtRepository';

const districtRouter = Router();

districtRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(districtModel);
        const {nome, status, codigoMunicipio} = request.body;

        const district = repo.create({
            nome, status, codigoMunicipio
        });
        const errors = await validate(district);

        if (errors.length === 0) {
            const res = await repo.save(district);
            return response.status(201).json(res);
        }
        return response.status(400).json(errors);
    } catch (err) {
        console.error('err.mensage :>>', err.message);
    }
}); 

districtRouter.get('/', async (request, response) => {

    const repository = new DistrictRepository;
    
    if (request.query.codigoMunicipio){        
        try{
        const res = await repository.findByIdCity(String(request.query.codigoMunicipio));
        response.status(200).json(res);
    }catch {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }}

    else if (request.query.codigoBairro){        
        try{
        const res = await repository.findById(String(request.query.codigoBairro));
        response.status(200).json(res);
    }catch {
        return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
    }}

    else if (request.query.nome){
        try{
        const res = await repository.findByName(String(request.query.nome));
        if (res.length === 0){
            throw new Error("");
        }
        response.status(200).json(res);
        }catch{
            return response.status(404).send({msg: "Não existe nenhum Nome com estes dados."});
        }  
    }
    else {
        const res = await repository.findAll();
    if (res.length === 0) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }
    response.status(200).json(res);
    };    
});
districtRouter.put('/:codigoBairro', async (request, response) => {
    const repository = getRepository(districtModel)
    const res = await repository.findOne(request.params.codigoBairro);
    if (!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        getRepository(districtModel).merge(res, request.body);
        const results = await getRepository(districtModel).save(res);
        return response.send(results);
    } 
});

districtRouter.delete("/:codigoBairro", async function(request, response) {
    const repository = getRepository(districtModel)
    const res = await repository.findOne(request.params.codigoBairro);
    if(!res) {
        return response.status(400).send({msg: "Não existe nenhum Nome com estes dados."});
    }else{
        res.status = 2;
        const results = await getRepository(districtModel).save(res);
        return response.send(results);
    }
});

export default districtRouter;