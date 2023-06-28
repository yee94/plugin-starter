import { Context } from './context';
import { resolveConfig } from './config';
import { createPluginContainer } from './plugin';
import { UserConfig } from './types';

export function createInstance() {
  return {
    ctx: new Context(),
    async init() {
      const config: UserConfig = {}; // Load from file, can use resolveConfig from esbuild-resolve-config

      const resolvedConfig = await resolveConfig(config);

      this.ctx.pluginContainer = createPluginContainer(resolvedConfig.plugins);
    },
  };
}
