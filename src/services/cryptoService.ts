import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';
import { config } from '../config/config';

export class CryptoService {
  public conf = config;

  public encriptPassword(myPlaintextPassword: string): string {
    const saltRounds = 5;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    return hash;
  }

  public checkPassword(myPlaintextPassword: string, hash: string): string {
    return bcrypt.compareSync(myPlaintextPassword, hash);
  }

  public encondeJwt(payload: any): string {
    const tokenJwt = payload ? jwt.encode(payload, process.env.JWT_SECRET) : null;
    return tokenJwt;
  }

  public decodeJwt(tokenJwt: string): any {
    const decodedJwt = tokenJwt ? jwt.decode(tokenJwt, process.env.JWT_SECRET) : null;
    return decodedJwt;
  }
}
