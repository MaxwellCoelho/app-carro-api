import { config } from '../config/config';

export class TestService {
  public conf = config;

  public getTest(currentTime: any) {
    return `${currentTime} - Sucesso Retorno API app-carro backend`
  }
}