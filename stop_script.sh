#!/bin/bash

# Stop MySQL (MariaDB) service
echo "Stopping MariaDB service..."
sudo systemctl stop mariadb.service

# Stop Spring Boot backend
echo "Stopping Spring Boot backend..."
SPRING_PID=$(ps aux | grep 'org.springframework.boot.loader.JarLauncher' | grep -v grep | awk '{print $2}')
if [ -n "$SPRING_PID" ]; then
  kill -9 $SPRING_PID
  echo "Spring Boot backend stopped."
else
  echo "Spring Boot backend not running."
fi

# Stop Vite frontend
echo "Stopping Vite frontend..."
VITE_PID=$(ps aux | grep 'vite' | grep -v grep | awk '{print $2}')
if [ -n "$VITE_PID" ]; then
  kill -9 $VITE_PID
  echo "Vite frontend stopped."
else
  echo "Vite frontend not running."
fi

# Notify user
echo "Project stopped!"
