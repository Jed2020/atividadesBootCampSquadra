import { EntityRepository, Repository } from 'typeorm';
import UF from '../models/stateModel';

@EntityRepository(UF)
export default class StateRepository extends Repository<UF> {
  public async findByName(nome_estado: string): Promise<UF[]> {
    return this.find({
      where: {
        nome_estado,
      },
    });
  }
}