#!/bin/bash

# Stop MySQL (MariaDB) service
echo "Stopping MariaDB service..."
sudo systemctl stop mariadb.service

# Stop Spring Boot backend
echo "Stopping Spring Boot backend... (port 8080)"
PORT_PID=$(lsof -t -i:8080)
if [ -n "$PORT_PID" ]; then
  kill -9 $PORT_PID
  echo "Killed process using port 8080."
else
  echo "No process using port 8080."
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
