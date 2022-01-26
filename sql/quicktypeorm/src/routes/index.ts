import { Router } from 'express';
import userRouter from './userRoutes';
import stateRouter from './stateRoutes';
import cityRouter from './cityRoutes';
import districtRouter from './districtRoutes';
import addressRouter from './addressRoutes';

const routes = Router();

routes.use('/pessoa', userRouter);
routes.use('/uf', stateRouter);
routes.use('/municipio', cityRouter);
routes.use('/bairro', districtRouter);
routes.use('/endereco', addressRouter);

export default routes;