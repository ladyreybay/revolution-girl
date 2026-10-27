Commands to Dockerise project
Create and run frontend container from frontend/revolution-girl

docker build -t rev-girl-img .
docker rm revGirlApp
docker run -e APP_ENV=docker -e APP_NAME="Revolution Girl" --name revGirlApp -p 5173:5173 rev-girl-img

Create and run backend container from backend

docker build -t rev-back-img .
docker rm revExpressApp
docker run -e APP_ENV=docker -e APP_NAME="Revolution Girl Backend" -e PORT=8080 --name revExpressApp -p 8080:8080 rev-back-img

Run using Docker Compose:
docker-compose up -d

Link to Github Repository:
https://github.com/ladyreybay/revolution-girl