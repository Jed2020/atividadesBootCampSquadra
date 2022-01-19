import { EntityRepository, Repository } from 'typeorm';
import Bairro from '../models/districtModel';

@EntityRepository(Bairro)
export default class DistrictRepository extends Repository<Bairro> {
  public async findByName(nome_bairro: string): Promise<Bairro[]> {
    return this.find({
      where: {
        nome_bairro,
      },
    });
  }
}