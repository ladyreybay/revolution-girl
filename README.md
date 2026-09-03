# revolution-girl  
## Repo housing submission stuff for IMY 220 project  

### Create and Run Frontend Container  

docker build -t rev-girl-img .  
docker rm revGirlApp  
docker run -e APP_ENV=docker -e APP_NAME="Revolution Girl" --name revGirlApp -p 5173:5173 rev-girl-img  

### Create and Run Backend Container  

docker build -t rev-back-img .  
docker rm revExpressApp  
docker run -e APP_ENV=docker -e APP_NAME="Revolution Girl Backend" -e PORT=8080 --name revExpressApp -p 8080:8080 rev-back-img  
