import useReflare from 'reflare';

declare const REFLARE: KVNamespace;

const handleRequest = async (
  request: Request,
): Promise<Response> => {
  const reflare = await useReflare({
    kv: {
      namespace: REFLARE,
    },
  });
  return reflare.handle(request);
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
