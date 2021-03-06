import { getRepository, Repository } from 'typeorm';
import Bairro from '../models/districtModel';

export default class DistrictRepository {
  private repository: Repository<Bairro>

  constructor(){
    this.repository = getRepository(Bairro);
  }
  public async findById(codigoBairro: string): Promise<Bairro> {
    return await this.repository.findOne({
      where: {
        codigoBairro,
      },
    });
  }

  public async findByIdCity(codigoMunicipio: string): Promise<Bairro> {
    return await this.repository.findOne({
      where: {
        codigoMunicipio,
      },
    });
  }

  public async findByName(nome: string): Promise<Bairro> {
    return await this.repository.findOne({
      where: {
        nome,
      },
    });
  }

  public async findAll(): Promise<Bairro[]> {
    return await this.repository.find();
  }
}