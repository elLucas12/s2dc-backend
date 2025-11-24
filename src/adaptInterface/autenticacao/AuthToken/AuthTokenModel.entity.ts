export class AuthTokenModel {
  id: number;
  hash: string;
  criadoEm: Date;

  constructor(id: number, hash: string, criadoEm: Date) {
    this.id = id;
    this.hash = hash;
    this.criadoEm = criadoEm;
  }
}
