Objective: Test a docker implementation running a NginX proxy reverse in front of Node.js application. 

To test it just run 2 steps:

docker-compose up -d

docker exec -it app bash
node index.js &


Now you can go to your browse and test it:

localhost:3000 it should access the application
localhost:8080 it should take you to nginx and redirected to the application on localhost:3000. 

