#!/bin/bash

# Start MySQL (MariaDB) service
echo "Starting MariaDB service..."
sudo systemctl start mariadb.service

# Start the Spring Boot backend
echo "Starting Spring Boot backend..."
cd peer-assessment-backend # Change this to your Spring Boot directory
mvn clean install
mvn spring-boot:run & # Run in background

# Start the Vite frontend
echo "Starting Vite frontend..."
cd ../front # Change this to your Vite frontend directory
npm install
npm run dev & # Run in background

# Notify user
echo "Project is starting up!"
