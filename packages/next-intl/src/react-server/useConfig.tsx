import getConfig from '../server/react-server/getConfig.js';
import use from '../shared/use.js';

function useHook<Value>(hookName: string, promise: Promise<Value>) {
  try {
    return use(promise);
  } catch (error: any) {
    if (
      error instanceof TypeError &&
      error.message.includes("Cannot read properties of null (reading 'use')")
    ) {
      throw new Error(
        `\`${hookName}\` is not callable within an async component. Please refer to https://next-intl.dev/docs/environments/server-client-components#async-components`,
        {cause: error}
      );
    } else {
      throw error;
    }
  }
}

export default function useConfig(
  hookName: string
): Awaited<ReturnType<typeof getConfig>> {
  return useHook(hookName, getConfig());
}
