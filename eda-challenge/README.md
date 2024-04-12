# Objective: Event Driven Architecture
This is simple microservice tests in GoLang with the purpose to test Kafka implementation publisher/consumer to apply some EDA concepts.

Although some best practices such as TDD were applied on the codebase, it is not fully test covered.

#Build the Environment

Execute to build up the all the microservices and the Kafka console
- create a .docker/mysql directory
```
docker compose up -d --build
```


Create a transaction ```./goapp/api/client.http```. 
```
POST http://localhost:8080/transactions HTTP/1.1
Content-Type: application/json

{
    "account_id_from": "0e96d032-86fd-11ec-8b22-9a5ce86758a4",
    "account_id_to": "534b6b56-a988-11ec-b7e0-2b8e9696da41",
    "amount": 50
}
```
Make a request ```./consumer/api/client.http```.
```
GET http://localhost:3003/balances HTTP/1.1
Content-Type: application/json

{
    "account_id": "0e96d032-86fd-11ec-8b22-9a5ce86758a4"
}
```
