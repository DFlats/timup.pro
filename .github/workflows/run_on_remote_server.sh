#!/bin/bash

BRANCH="release"

check_for_updates() {
    git fetch origin $BRANCH
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})

    if [ $LOCAL != $REMOTE ]; then
        echo "Changes detected. Pulling latest changes..."
        git pull origin $BRANCH

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
        npm start &
        FRONTEND_PID=$!
        cd ..

        wait $BACKEND_PID
        wait $FRONTEND_PID
    else
        echo "No changes detected."
    fi
}

while true; do
    check_for_updates
    sleep 60
done