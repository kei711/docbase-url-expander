# Docbase Url Expander

## Prerequisite

- Node.js 16.x
- Yarn 1.x
- direnv

## Setup

```shell
cp .env.sample .env
direnv allow
yarn

# Run
yarn run esbuild ./src/index.ts
```

### ngrok

```shell
ngrok http 3000
```
