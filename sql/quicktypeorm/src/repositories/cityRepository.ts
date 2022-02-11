import { getRepository, Repository } from 'typeorm';
import Municipio from '../models/cityModel';

export default class CityRepository {
  private repository: Repository<Municipio>

  constructor(){
    this.repository = getRepository(Municipio);
  }
  public async findById(codigoMunicipio: string): Promise<Municipio> {
    return await this.repository.findOne({
      where: {
        codigoMunicipio,
      },
    });
  }

  public async findByName(nome: string): Promise<Municipio> {
    return await this.repository.findOne({
      where: {
        nome,
      },
    });
  }

  public async findByIdUF(codigoUF: string): Promise<Municipio[]> {
    return await this.repository.find({
      where: {
        codigoUF,
      },
    });
  }

  public async findAll(): Promise<Municipio[]> {
    return await this.repository.find();
  }
}