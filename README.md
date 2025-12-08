# S2DC - Back-end

## Configuração

Primeiramente, é necessário instalar as dependências do sistema para
seu pleno funcionamento.

```bash
# Instala as dependências do sistema
$ npm install
```

Para que o sistema funcione de maneira estável e plena, é necessário
realizar a população inicial do banco de dados (através do *script* de
população).

```bash
# Popula o banco de dados
$ npm run populardb
```

> Isto é necessário para a criação do usuário administrativo principal,
> chamado "admin" e para a adição de alguns dados para criar estabilidade
> no uso do banco.

## Compilar e Rodar

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Rodar Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
