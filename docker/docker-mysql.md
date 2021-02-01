# Instalar MySQL en Docker

1. Obtener la imagen de mysql

```
docker pull mysql
```

2. Crear un volumen

```
docker volume create mysql-data
```

3. Crear el contenedor

```
docker run -d --name=mysql-server-node04 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=3LQuijote -v  mysql-node04:/var/lib/mysql mysql
```

4. Revisar si funciona el contenedor

```
docker ps
```
