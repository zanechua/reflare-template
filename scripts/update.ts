import { execSync } from 'child_process';
import { routeQueue } from '../reflare.config';

const main = async () => {
  const env = process.argv[2] || 'production';
  const routeQueueJSON = JSON.stringify(routeQueue).replace(/"/g, '\\"');
  try {
    if (env === 'production') {
      console.log('Updating the reflare deployment with \'reflare.config.ts\'...');
      execSync(
        `npx wrangler kv:key put --binding=REFLARE "route-queue" "${routeQueueJSON}"`,
      );
    } else if (env === 'preview') {
      console.log('Updating the reflare preview with \'reflare.config.ts\'...');
      execSync(
        `npx wrangler kv:key put --binding=REFLARE "route-queue" "${routeQueueJSON}" --preview`,
      );
    } else {
      console.log(`Error: Unrecognized environment`);
      process.exit(1);
    }
    console.log('Success!');
  } catch (error) {
    process.exit(1);
  }
};

main();
