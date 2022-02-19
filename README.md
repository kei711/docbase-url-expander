# DocBase Url Expander

Slack bot for unfurling [DocBase](https://docbase.io) URLs.

[![Latest Version](https://img.shields.io/github/v/release/kei711/docbase-url-expander)](https://github.com/kei711/docbase-url-expander/releases)
[![Build](https://github.com/kei711/docbase-url-expander/actions/workflows/main.yml/badge.svg)](https://github.com/kei711/docbase-url-expander/actions/workflows/main.yml)

[GitHub Container Registry](https://github.com/kei711/docbase-url-expander/pkgs/container/docbase-url-expander)

## Usage

```shell
# copy and edit the .env file
cp .env.sample .env
docker run --env-file .env --init --rm ghcr.io/kei711/docbase-url-expander:latest
```

### Environment variables

- SLACK_BOT_TOKEN
  - Bot token strings begin with `xoxb-`
- SLACK_APP_TOKEN
  - App token strings begin with `xapp-`
- DOCBASE_TEAM_NAME
  - `https://<DOCBASE_TEAM_NAME>.docbase.io`
- DOCBASE_ACCESS_TOKEN
  - Access token of DocBase
  - see [アクセストークン作成方法](https://help.docbase.io/posts/45703#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E4%BD%9C%E6%88%90%E6%96%B9%E6%B3%95)

## For local development

### Prerequisite

- Node.js 16.x
- Yarn 1.x
- direnv

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

[MIT](./LICENSE)
