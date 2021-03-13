# Docker Redis

## Setup Redis

1. Download image

```
docker pull redis:6.0.5-alpine
```

2. Create a volume

```
docker volume create redis-data
```

3. Create container

```
docker run -d --name=redis-container -v redis-data:/data -p 6379:6379 redis:6.0.5-alpine redis-server --requirepass todovale
```

4. Check if container is running

```
docker ps
```

5. To connect using Redis Commander

- Install Redis Commander

```
npm i -g redis-commander
```

- Execute

```
redis-commander -p 8088 --redis-password todovale
```
