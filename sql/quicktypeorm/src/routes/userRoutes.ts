import { Router } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import userModel from '../models/userModel';
import addressModel from '../models/addressModel';
import UserRepository from '../repositories/userRepository';


const userRouter = Router();

userRouter.post('/', async (request, response) => {

    try {
        const repo = getRepository(userModel);
        const repoAdrres = getRepository(addressModel);
        const {nome, sobrenome, idade, login, senha, status, Endereco
        } = request.body;
        
        const nameLogin = await repo.findOne({
            where: { login: request.body.login}
        });
        if (nameLogin){
            return response.status(404).send({status: 404, mensagem: "Existe um cadastro com esse login banco de dados."});
        }
        
        const user = repo.create({
            nome, sobrenome, idade, login, senha, status
        });

        const errors = await validate(user);

        if (errors.length === 0) {
            await repo.save(user);
            
            Endereco.forEach(item =>  { 
                repoAdrres.save({
                    nomeRua: item.nomeRua, numero: item.numero, complemento: item.complemento, 
                    cep: item.cep, codigoBairro: item.codigoBairro, codigoPessoa: user.codigoPessoa
                 });
            });
            
            const all = await getRepository(userModel).find();
            return response.status(201).send(all);
        }
        return response.status(404).json(errors);        
    } catch (err) {
        console.error('err.mensage :>>', err.message);
        return response.status(404).send({status: 404, mensagem: "Nao foi possivel conectar com o banco de dados."});
    }
}); 

userRouter.get('/', async (request, response) => {

    const repository = new UserRepository;
    
    if (request.query.codigoPessoa){        
        try{
        const res = await repository.findById(String(request.query.codigoPessoa));
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
        if (!res){
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

userRouter.put('/', async (request, response) => {
        
    try {
        const repository = getRepository(userModel);
        const repoAdrres = getRepository(addressModel);
        const {codigoPessoa, Endereco} = request.body;
        const userExist = await repository.findOne(codigoPessoa);      
        
        if (!userExist){
            return response.status(404).send({status: 404, mensagem: "Nao existe nenhuma Pessoa com este codigo."});
        } else {

            let postman = request.body;

            userExist.nome = postman.nome;
            userExist.sobrenome = postman.sobrenome;
            userExist.idade = postman.idade;
            userExist.login = postman.login;
            userExist.senha = postman.senha;
            userExist.status = postman.status;

            repository.save(userExist);

            let encontrados = await repoAdrres.find({where: {codigoPessoa}});

            for (const item of encontrados) {

                let exists = Endereco.filter(x => x.codigoEndereco == item.codigoEndereco);
        
                if (exists.length <= 0) {
                    repoAdrres.delete(item.codigoEndereco);
                }

            }

            for (const item of Endereco) {
                if (item.codigoEndereco != null) {

                    let exists = encontrados.filter(x => x.codigoEndereco == item.codigoEndereco);

                    if (exists.length > 0) {
                        repoAdrres.merge(exists[0], item);
                        await repoAdrres.save(exists);
                    }

                } else {
                    repoAdrres.save({
                        nomeRua: item.nomeRua, numero: item.numero, complemento: item.complemento, 
                        cep: item.cep, codigoBairro: item.codigoBairro, codigoPessoa: item.codigoPessoa
                    });
                }
            }
        }
        
        const all = await getRepository(userModel).find();
        return response.status(200).send(all);

    } catch (err){
        console.error('err.mensage :>>', err.message);
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