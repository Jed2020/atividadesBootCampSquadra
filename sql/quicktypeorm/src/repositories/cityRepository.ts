import { EntityRepository, Repository } from 'typeorm';
import Municipio from '../models/cityModel';

@EntityRepository(Municipio)
export default class StateRepository extends Repository<Municipio> {
  public async findByName(nome: string): Promise<Municipio[]> {
    return this.find({
      where: {
        nome,
      },
    });
  }

  public async findByState(codigoUF: string): Promise<Municipio[]> {
    return this.find({
      where: {
        codigoUF,
      },
    });
  }

  public async findByCity(codigoMunicipio: string): Promise<Municipio[]> {
    return this.find({
      where: {
        codigoMunicipio,
      },
    });
  }
}