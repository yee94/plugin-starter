import { createPluginContainer } from './plugin';

export class Context {
  // @ts-ignore
  pluginContainer: ReturnType<typeof createPluginContainer>;
}
