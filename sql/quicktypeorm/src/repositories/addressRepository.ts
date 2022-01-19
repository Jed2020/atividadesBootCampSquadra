import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../models/addressModel';

@EntityRepository(Endereco)
export default class StateRepository extends Repository<Endereco> {
  public async findByName(nome_endereco: string): Promise<Endereco[]> {
    return this.find({
      where: {
        nome_endereco,
      },
    });
  }
}