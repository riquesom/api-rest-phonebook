# PHONEBOOK API REST

## Passos de uso

- `docker build -t api_phonebook .`
- `docker-compose up -d`

![image](https://github.com/riquesom/api-rest-phonebook/assets/51427897/9ed9d4d3-bc6d-4364-a87b-5e732f0f5950)
_Exemplo_

## Documentação

Foi construida dentro do Postman, é possivel importar o arquivo `API PHONEBOOK.postman_collection.json` que se encontro na raiz do repositório para o Postman.

![image](https://github.com/riquesom/api-rest-phonebook/assets/51427897/fa7f0017-9866-4f6d-adcd-baa28193e43f)

## Teste

Para realizar os testes é possivel utilizar o comando abaixo:

`node ace test`

![image](https://github.com/riquesom/api-rest-phonebook/assets/51427897/978c8017-13b0-4927-8cdb-94cf45fb74ec)


## Migrations

Por questões de teste e para garantir a execução das migration coloquei um trigger dentro de um endpoint para facilitar o teste.
_`(Tambem é possivel utilizar o comando "node ace migration:run")`_

- `http://localhost:3333/`
