FROM node:alpine3.10 as stageBuild

ADD package*.json /tmp

RUN cd /tmp && npm install
RUN mkdir /app && cp -a /tmp/node_modules /app

WORKDIR /app
ADD . .

RUN npm run build

FROM node:alpine3.10

WORKDIR /app

COPY --from=stageBuild /app/node_modules ./node_modules
COPY --from=stageBuild /app/dist ./dist
COPY package.json .
COPY env.yaml . 

EXPOSE 85

CMD ["npm", "run", "serve"]
