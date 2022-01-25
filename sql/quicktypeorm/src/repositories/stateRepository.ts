import { EntityRepository, Repository } from 'typeorm';
import UF from '../models/stateModel';

@EntityRepository(UF)
export default class StateRepositoryId extends Repository<UF>{
  public async findBySigla(sigla: string): Promise<UF[]> {
    return await this.find({
      where: {
        sigla,
      },
    });
  }

}