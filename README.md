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

### 4º Crie um usuário e autentique-se

Utilize a rota POST "http://localhost:3333/users" para criar um usuário.

Exemplo de requisição:

```
{
	"name": "Gustavo",
	"email": "email@email.com",
	"password": "1234"
}
```

Autentique-se para criar um token de sessão utilizando a rota POST "http://localhost:3333/sessions".

Exemplo de requisição:

```
{
	"email": "email@email.com",
	"password": "1234"
}
```

### 5º Token

Ao autenticar-se na aplicação, você deverá passar o `token` recebido para as demais requisições como um `Bearer token` de `Authorization`.

## Insomnia

Caso utilize [Insomnia](https://insomnia.rest/download/) para testes de requisições:

Na raiz do projeto, pode-se encontrar o arquivo Insomnia_config.json para importar uma workspace do insomnia e testar as rotas da aplicação.

## Ferramentas e utilizadas

A aplicação utiliza as seguintes ferramentas e utilidades:

* MongoDB - para armazenamento dos dados
* mongoose - para conexão e utilidades do banco
* JWT - para controle de sessões e segurança
* Bcrypt - para criptografias
* Yup - para checagem de requisições
