# Objective: Test a docker implementation running a NginX proxy reverse in front of Node.js application. 

To test it just run:

1. docker-compose up -d


# Now you can go to your browser and test it:

localhost:3000 it should access the application
localhost:8080 it should take you to nginx and redirected to the application on localhost:3000. 

