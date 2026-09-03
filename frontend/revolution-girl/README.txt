Create and run frontend container

docker build -t rev-girl-img .
docker rm revGirlApp
docker run -e APP_ENV=docker -e APP_NAME="Revolution Girl" --name revGirlApp -p 5173:5173 rev-girl-img

Create and run backend container