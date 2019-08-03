# fiap-api-veiculos-autonomos
API para Controle de Frotas de Veículos Autônomos - MBA FIAP

# Documentação:
* [Swagger](https://app.swaggerhub.com/apis/gabrielsouzaa/course-api/1.0.0#/)

## Executando a aplicação

### 1º instalação de um package manager

Para iniciar a aplicação é preciso ter o [npm](https://www.npmjs.com/) ou o [yarn](https://yarnpkg.com) instalados.

### 2º instalação de dependências

O projeto possui dependências que devem ser baixadas utilizando os comandos em seu terminal.

Para o `npm`:

```
npm install
```

Para o `yarn`:

```
yarn
```

### 3º Iniciando servidor de desenvolvimento

Ao instalar as dependências, deve-se inicializar o servidor de desenvolvimento.

Iniciando com `npm`:

```
npm run dev
```

Iniciando com `yarn`:

```
yarn dev
```

Com este comando, o servidor de desenvolvimento será aberto em "http://localhost:3333".

## Ferramentas e utilizades

A aplicação utiliza as seguintes ferramentas e utilidades:

* MongoDB - para armazenamento dos dados
* mongoose - para conexão e utilidades do banco
* JWT - para controle de sessões e segurança
* Bcrypt - para criptografias
* Yup - para checagem de requisições
