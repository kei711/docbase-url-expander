FROM node:16-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile

COPY . .

RUN yarn build

# ---

FROM node:16-alpine AS node_modules
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --non-interactive --frozen-lockfile --prod

# ---

FROM gcr.io/distroless/nodejs:18
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/dist .
COPY --from=node_modules /app/node_modules ./node_modules

EXPOSE 3000
CMD ["./index.js"]
