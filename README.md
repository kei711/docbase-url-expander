# Docbase Url Expander

[![Build](https://github.com/kei711/docbase-url-expander/actions/workflows/main.yml/badge.svg)](https://github.com/kei711/docbase-url-expander/actions/workflows/main.yml)

## Prerequisite

- Node.js 16.x
- Yarn 1.x
- direnv

## Commands

### Setup

```shell
cp .env.sample .env
direnv allow
yarn
```

### Execute

```shell
# Run
yarn run esbuild ./src/index.ts
```

### Docker

```shell
docker build -t docbase-url-expander .
docker run --env-file .env --init --rm docbase-url-expander
```

## License

MIT
