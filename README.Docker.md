### Instructions on running app in Docker
1. Build application:
```shell
ng build
```

2. To run it locally in development mode use (port 4200 will be used by default):
```shell
ng serve
```

3. Ensure that docker is installed on your system (`docker -v`)

4. Build image (run it in the app's root folder):
```shell
docker build -t my-cool-image .
```

5. Run docker container(in detached mode):
```shell
docker run -it -d -p 4200:4200 --name=container-name my-cool-image
```