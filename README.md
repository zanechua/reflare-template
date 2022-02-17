![Header](https://raw.githubusercontent.com/xiaoyang-sde/reflare/master/.github/img/header.jpg)

:rocket: The template to deploy Reflare to [Cloudflare Workers](https://developers.cloudflare.com/workers/). The `reflare.config.ts` file contains the route configuration of Reflare. The documentation of Reflare can be found [here](https://github.com/xiaoyang-sde/reflare).

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xiaoyang-sde/reflare-template)

## Installation

[Install `wrangler` CLI](https://github.com/cloudflare/wrangler#installation) and authorize `wrangler` with Cloudflare account.

```console
npm install -g @cloudflare/wrangler
wrangler login
```

Generate a new project from [reflare-template](https://github.com/xiaoyang-sde/reflare-template) and install the dependencies.

```console
wrangler generate reflare-app https://github.com/xiaoyang-sde/reflare-template
cd reflare-app
npm install
```

## Development

Edit the `routeQueue` in `reflare.config.ts`. The `routeQueue` is a list of route configuration of Reflare. Please read [the documentation of Reflare](https://github.com/xiaoyang-sde/reflare) for more details.

```ts
export const routeQueue: RouteQueue = [
  {
    pattern: '/get',
    upstream: {
      domain: 'httpbin.org',
      protocol: 'https',
    },
    methods: ['GET'],
  },
  {
    pattern: '/*',
    upstream: {
      domain: 'example.com',
      protocol: 'https',
    },
  },
];
```

Persist the configuration and start the development server.

```console
npm run persist dev
npm run dev
```

## Deployment

Create a `REFLARE` KV namespace.

```console
wrangler kv:namespace create "REFLARE"
```

Persist the configuration and publish Reflare to Cloudflare Workers.

```console
npm run persist
npm run deploy
```
