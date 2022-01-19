import { Router } from 'express';
import userRouter from './userRoutes';
import stateRouter from './stateRoutes';
import cityRouter from './cityRoutes';
import districtRouter from './districtRoutes';
import addressRouter from './addressRoutes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/state', stateRouter);
routes.use('/city', cityRouter);
routes.use('/district', districtRouter);
routes.use('/address', addressRouter);

export default routes;