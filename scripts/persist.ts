import { Miniflare } from "miniflare";
import { execSync } from 'child_process';
import { routeQueue } from '../reflare.config';

const main = async () => {
  const env = process.argv[2] || 'production';
  const routeQueueJSON = JSON.stringify(routeQueue);
  try {
    if (env === 'prod' || env === 'production') {
      console.log('[production] Persisting the reflare configuration...');
      execSync(`npx wrangler kv:key put --binding=REFLARE "route-queue" "${routeQueueJSON.replace(/"/g, '\\"')}"`,);
      console.log('Success!');
    } else if (env === 'dev' || env === 'development') {
      console.log('[development] Persisting the reflare configuration...');
      const miniflare = new Miniflare({
        script: '',
        kvNamespaces: ['REFLARE'],
        kvPersist: true,
      });
      const kv = await miniflare.getKVNamespace('REFLARE');
      await kv.put('route-queue', routeQueueJSON);
      console.log('Success!');
    } else {
      console.log(`[error] Unrecognized environment`);
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
