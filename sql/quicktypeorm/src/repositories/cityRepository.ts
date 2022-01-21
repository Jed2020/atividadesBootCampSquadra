import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../models/cityModel';

@EntityRepository(Municipio)
export default class StateRepository extends Repository<Municipio> {
  public async findByName(nome_cidade: string): Promise<Municipio[]> {
    return this.find({
      where: {
        nome_cidade,
      },
    });
  }
}