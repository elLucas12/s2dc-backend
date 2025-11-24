import { Dependencies, Injectable } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createHash } from 'crypto';

import { AuthToken } from './AuthToken.entity';
import { AuthTokenModel } from './AuthTokenModel.entity';
import { IAuthTokenRepository } from './IAuthToken.repository';

@Injectable()
@Dependencies(getRepositoryToken(AuthToken))
export class AuthTokenRepository implements IAuthTokenRepository {
  constructor(private readonly authTokens: any) {}

  public async gerar(sal: string): Promise<AuthTokenModel> {
    const sha256 = this.gerarSha256(sal);
    const resp = await this.authTokens.save({
      hash: sha256,
    });
    return AuthTokenRepository.createFromObject(resp);
  }

  public async consultar(id: number): Promise<AuthTokenModel> {
    const resp = await this.authTokens.findOneBy({ id });
    return AuthTokenRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<AuthTokenModel> {
    const resp = await this.authTokens.delete(id);
    return AuthTokenRepository.createFromObject(resp);
  }

  public async atualizar(id: number, sal: string): Promise<AuthTokenModel> {
    const sha256 = this.gerarSha256(sal);
    const resp = await this.authTokens.save({
      hash: sha256,
    });
    return AuthTokenRepository.createFromObject(resp);
  }

  public async todos(): Promise<AuthTokenModel[]> {
    const resp = await this.authTokens.find();
    return resp.map(AuthTokenRepository.createFromObject);
  }

  public async consultarHash(hash: string): Promise<AuthTokenModel> {
    const resp = await this.authTokens.find({
      where: {
        hash: hash,
      },
    });
    return AuthTokenRepository.createFromObject(resp);
  }

  private gerarSha256(text: string): string {
    return createHash('sha256').update(text).digest('hex');
  }

  public static createFromObject(obj: {
    id: number;
    hash: string;
    criadoEm: Date;
  }): AuthTokenModel {
    if (!obj) {
      return obj;
    }
    return new AuthTokenModel(obj.id, obj.hash, obj.criadoEm);
  }
}
