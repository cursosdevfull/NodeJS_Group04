# Instalar Sonarqube en Docker

1. Obtener la imagen de Sonarqube

```
docker pull sonarqube
```

2. Crear el contenedor

```
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

3. Login http://localhost:9000 usuario: admin contraseña: admin

```
docker ps
```
