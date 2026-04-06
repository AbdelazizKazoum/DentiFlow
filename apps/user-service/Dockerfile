FROM node:alpine As builder

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

COPY apps/user-service apps/user-service
COPY libs libs

RUN npm run build user-service

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --prod

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/user-service/main"]