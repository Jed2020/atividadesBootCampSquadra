import { getRepository, Repository } from 'typeorm';
import Pessoa from '../models/userModel';

export default class CityRepository {
  private repository: Repository<Pessoa>

  constructor(){
    this.repository = getRepository(Pessoa);
  }

  public async findById(codigoPessoa: string): Promise<Pessoa[]> {
    return await this.repository.find({
      where: {
        codigoPessoa,
      },
    });
  }

  public async findByIdAddress(codigoEndereco: string): Promise<Pessoa[]> {
    return await this.repository.find({
      where: {
        codigoEndereco,
      },
    });
  }

  public async findByName(nome: string): Promise<Pessoa[]> {
    return await this.repository.find({
      where: {
        nome,
      },
    });
  }

  public async findAll(): Promise<Pessoa[]> {
    return await this.repository.find();
  }
}

