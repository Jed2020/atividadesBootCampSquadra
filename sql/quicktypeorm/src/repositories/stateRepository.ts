import { getRepository, Repository } from 'typeorm';
import UF from '../models/stateModel';

export default class StateRepository {
  private repository: Repository<UF>

  constructor(){
    this.repository = getRepository(UF);
  }
  public async findById(codigoUF: string): Promise<UF> {
    return await this.repository.findOne({
      where: {
        codigoUF,
      },
    });
  }

  public async findBySigla(sigla: string): Promise<UF> {
    return await this.repository.findOne({
      where: {
        sigla,
      },
    });
  }

  public async findAll(): Promise<UF[]> {
    return await this.repository.find();
  }
}