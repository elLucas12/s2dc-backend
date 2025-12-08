# S2DC - Back-end

## Configuração

### Dependências

Primeiramente, é necessário instalar as dependências do sistema para
seu pleno funcionamento.

```bash
# Instala as dependências do sistema
$ npm install
```

### Variáveis de Ambiente

Após, é necessário realizar a configuração das variáveis de ambiente do sistema,
para tanto é necessário escreve-las conforme o seguinte template:

```env
DB_HOST="127.0.0.1"
DB_PORT=3306
DB_USERNAME=nomeusuario
DB_PASSWORD=senhausuario123
DB_NAME=s2dc_data
JWT_SECRET=senhajwt123
JWT_EXPIRES_IN=1d
```

> A não definição das variáveis de ambiente fará, consequentemente, o não
> funcionamento do sistema (ou um mal funcionamento, conforme as definições) -
> portanto, crie o `.env` e realize o preenchimento.

## Compilar e Rodar

Para rodar o sistema é necessário realizar a inicialização através do comando
abaixo e, também, realizar a população imediatamente após (conforme próxima
seção).

```bash
# desenvolvimento (padrão)
$ npm run start

# modo de atualização constante (watch mode)
$ npm run start:dev
```

### Popular Banco de Dados

**Para que o sistema funcione de maneira estável e plena**, é necessário
realizar a população inicial do banco de dados (através do *script* de
população) no primeiro uso. Portanto, deve-se rodar o comando abaixo logo
após o fim do comando de *start* do sistema.

```bash
# Popula o banco de dados
$ npm run populardb
```

> Isto é necessário para a criação do usuário administrativo principal,
> chamado "admin" e para a adição de alguns dados para criar estabilidade
> no uso do banco.

## Rodar Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
