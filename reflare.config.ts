import { RouteQueue } from 'reflare';

export const routeQueue: RouteQueue = [
  {
    pattern: '/*',
    upstream: {
      domain: 'httpbin.org',
      protocol: 'https',
    },
  },
];
