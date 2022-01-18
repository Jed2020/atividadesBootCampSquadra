import { EntityRepository, Repository } from 'typeorm';
import Pessoa from '../models/userModel';

@EntityRepository(Pessoa)
export default class UserRepository extends Repository<Pessoa> {
  public async findByName(nome: string): Promise<Pessoa[]> {
    return this.find({
      where: {
        nome,
      },
    });
  }
}