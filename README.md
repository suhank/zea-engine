# Zea Engine

A high performance 3D rendering engine for the web.

![Test and build](https://github.com/ZeaInc/zea-engine/workflows/Test%20and%20build/badge.svg)
![Coverage: Statements](coverage/badge-statements.svg)
[![npm](https://img.shields.io/npm/v/@zeainc/zea-engine?style=flat-square)](https://www.npmjs.com/package/@zeainc/zea-engine)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Docs

[https://zea.live/zea-engine/](https://zea.live/zea-engine/)

## Getting started

1. Install Git.
2. Install Node.js from here: https://nodejs.org/en/download/ using the default options. It should be straight forward.
3. Install dependencies.

- Install the [Yarn package manager](https://yarnpkg.com/) (it should be included in the latest Node.js version).
- Run `yarn install`

4. Build:

- See the [scripts section](#scripts) below.

## Scripts

Note: The Zea Engine documentation uses `yarn` commands, but `npm` will also work. You can compare `yarn` and `npm` commands in the [yarn docs, here](https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison).

- `yarn run build` - Produces the production version of ZeaEngine.
- `yarn run build:watch` - Produces the development version of ZeaEngine and triggers a re-compilation on file changes.

## Running automated tests

In your development environment you can run:

```
yarn test
```

Or, to trigger a re-compilation on file changes:

```
yarn run test:watch
```

In your CI environment you can run:

```
yarn install --frozen-lockfile --ignore-scripts
yarn run build
yarn test
```

## Typical development workflow

1. Open your preferred terminal.

2. Navigate to the directory containing the ZeaEngine sources. E.g. `cd ~/your-dir/zea-engine/`

3. Build ZeaEngine in development mode:

- Run `yarn run build:watch`. Produces the development version of ZeaEngine and triggers a re-compilation on file changes.

## Publishing a new build

The npm scripts hook takes care of the heavy lifting, you only need to run:

```
yarn publish
```
