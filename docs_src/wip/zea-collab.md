---
sidebar_position: 3
title: Zea Collab
---

# Zea Collab

The Zea Collab library provides Client and Server side tools for connecting and synchronizing users.

## Adding Zea Collab to your project

Insert these tags in your page:

For staging environment:

```html
<script src="https://websocket-staging.zea.live/socket.io/socket.io.js"></script>
<script crossorigin src="https://unpkg.com/@zeainc/zea-collab"></script>
```

For production environment:

```html
<script src="https://websocket.zea.live/socket.io/socket.io.js"></script>
<script crossorigin src="https://unpkg.com/@zeainc/zea-collab"></script>
```

## Enabling useful debug messages

1. Open the DevTools console.
2. Input this command: `localStorage.debug = 'zea:collab'`
3. Reload your browser.


## Building and dist

```bash
yarn run dist
```

