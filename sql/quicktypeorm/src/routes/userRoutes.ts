import { Router } from 'express';
import { getRepository } from 'typeorm';
import userModel from '../models/userModel';

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

export default userRouter;