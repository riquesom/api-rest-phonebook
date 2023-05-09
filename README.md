# PHONEBOOK API REST

## Passos de uso

- `docker build -t api_phonebook .`
- `docker-compose up -d`

## Documentação

Foi construida dentro do Postman, é possivel importar o arquivo `API PHONEBOOK.postman_collection.json` que se encontro na raiz do repositório para o Postman.

## Teste

Para realizar os testes é possivel utilizar o comando abaixo:

`node ace test`

## Migrations

Por questões de teste e para garantir a execução das migration coloquei um trigger dentro de um endpoint para facilitar o teste.
_`(Tambem é possivel utilizar o comando "node ace migration:run")`_

- `http://localhost:3333/`
