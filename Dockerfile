FROM node:16-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn build
RUN npm prune --production
RUN yarn cache clean

FROM node:16-alpine
WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD node ./index.js
