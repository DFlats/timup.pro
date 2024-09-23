#!/bin/bash

BRANCH="deploy"
BACKEND_PID=0
FRONTEND_PID=0
BACKEND_PORT=5055

check_for_updates() {
    git fetch origin $BRANCH
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})

    if [ $LOCAL != $REMOTE ]; then
        echo "Changes detected. Pulling latest changes..."
        git pull origin $BRANCH

        if [ $BACKEND_PID -ne 0 ]; then
            echo "Stopping existing backend process..."
            kill $BACKEND_PID
        fi

        if [ $FRONTEND_PID -ne 0 ]; then
            echo "Stopping existing frontend process..."
            kill $FRONTEND_PID
        fi

        echo "Freeing up port $BACKEND_PORT..."
        fuser -k $BACKEND_PORT/tcp

        echo "Running dotnet build..."
        cd Backend
        dotnet build
        echo "Running dotnet application..."
        dotnet run &
        BACKEND_PID=$!
        cd ..

        echo "Building frontend application..."
        cd Frontend
        npm install
        npm run build
        echo "Running frontend application..."
        npm run dev &
        FRONTEND_PID=$!
        cd ..
    else
        echo "No changes detected."
    fi
}

while true; do
    check_for_updates
    sleep 60
done