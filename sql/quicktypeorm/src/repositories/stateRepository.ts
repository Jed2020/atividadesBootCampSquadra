import { EntityRepository, Repository } from 'typeorm';
import UF from '../models/stateModel';

@EntityRepository(UF)
export default class StateRepository extends Repository<UF> {
  public async findById(CodigoUf: string): Promise<UF[]> {
    return this.find({
      where: {
        CodigoUf,
      },
    });
  }

  public async findBySigla(sigla: string): Promise<UF[]> {
    return this.find({
      where: {
        sigla,
      },
    });
  }
}

