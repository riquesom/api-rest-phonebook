# PHONEBOOK API REST

## Passos de uso

- `docker build -t api_phonebook .`
- `docker-compose up -d`

![image](https://github.com/riquesom/api-rest-phonebook/assets/51427897/b37c74d9-7226-4d26-83dd-ace739038829)

_Exemplo_

## Documentação

Foi construida dentro do Postman, é possivel importar o arquivo `API PHONEBOOK.postman_collection.json` que se encontro na raiz do repositório para o Postman.

![image](https://github.com/riquesom/api-rest-phonebook/assets/51427897/5d580949-1e6d-40ca-8ff1-7039e1913cac)

## Teste

Para realizar os testes é possivel utilizar o comando abaixo:

`node ace test`

![image](https://github.com/riquesom/api-rest-phonebook/assets/51427897/4939d330-4870-4258-ba3a-c508e5edfabf)

## Migrations

Por questões de teste e para garantir a execução das migration coloquei um trigger dentro de um endpoint para facilitar o teste.
_`(Tambem é possivel utilizar o comando "node ace migration:run")`_

- `http://localhost:3333/`
