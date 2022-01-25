import { EntityRepository, Repository } from 'typeorm';
import UF from '../models/stateModel';

@EntityRepository(UF)
export default class StateRepositoryId extends Repository<UF>{
  public async findBySigla(codigoUF: string, sigla: string): Promise<UF[]> {
    return await this.find({
      where: {
        codigoUF,
        sigla,
      },
    });
  }

}