import { Plugin, UserConfig } from './types';
import { asyncFlatten, deepMerge } from './utils';
import { createPluginContainer } from './plugin';

/**
 * Resolve the config into a usable format.
 * @param config
 */
export async function resolveConfig(config: UserConfig) {
  const rawWorkerUserPlugins = ((await asyncFlatten(config.plugins || [])) as Plugin[]).filter(Boolean);

  const [workerPrePlugins, workerNormalPlugins, workerPostPlugins] = sortUserPlugins(rawWorkerUserPlugins);

  let workerConfig = config;

  const workerUserPlugins = [...workerPrePlugins, ...workerNormalPlugins, ...workerPostPlugins];

  const pluginContainer = createPluginContainer(workerUserPlugins);
  workerConfig = await pluginContainer('config', [workerConfig], {
    iterate: mergeConfig as any,
  });

  workerConfig.plugins = workerUserPlugins;

  return workerConfig;
}

async function runConfigHook(config: UserConfig, plugins: Plugin[]): Promise<UserConfig> {
  let conf = config;

  for (const p of plugins) {
    const handler = p.config;
    if (handler) {
      const res = await handler(conf);
      if (res) {
        conf = mergeConfig(conf, res);
      }
    }
  }

  return conf;
}

/**
 * Merge two configs together.
 * @param defaults
 * @param overrides
 */
export function mergeConfig(defaults: Partial<UserConfig>, overrides: Partial<UserConfig>): UserConfig {
  return deepMerge(defaults, overrides);
}

export function sortUserPlugins(plugins: (Plugin | Plugin[])[] | undefined): [Plugin[], Plugin[], Plugin[]] {
  const prePlugins: Plugin[] = [];
  const postPlugins: Plugin[] = [];
  const normalPlugins: Plugin[] = [];

  if (plugins) {
    plugins.flat().forEach((p) => {
      if (p.enforce === 'pre') prePlugins.push(p);
      else if (p.enforce === 'post') postPlugins.push(p);
      else normalPlugins.push(p);
    });
  }

  return [prePlugins, normalPlugins, postPlugins];
}
