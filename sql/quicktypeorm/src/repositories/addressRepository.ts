import { getRepository, Repository } from 'typeorm';
import Endereco from '../models/addressModel';

export default class CityRepository {
  private repository: Repository<Endereco>

  constructor(){
    this.repository = getRepository(Endereco);
  }
  public async findById(codigoEndereco: string): Promise<Endereco> {
    return await this.repository.findOne({
      where: {
        codigoEndereco,
      },
    });
  }

  public async findByName(nomeRua: string): Promise<Endereco> {
    return await this.repository.findOne({
      where: {
        nomeRua,
      },
    });
  }

  public async findByIdUser(codigoPessoa: string): Promise<Endereco> {
    return await this.repository.findOne({
      where: {
        codigoPessoa,
      },
    });
  }

  public async findByIdDistrict(codigoBairro: string): Promise<Endereco> {
    return await this.repository.findOne({
      where: {
        codigoBairro,
      },
    });
  }

  public async findAll(): Promise<Endereco[]> {
    return await this.repository.find();
  }
}