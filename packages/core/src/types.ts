export interface Plugin {
  /**
   * The name of the plugin.
   */
  name: string;

  /**
   * The enforced order of the plugin.
   */
  enforce?: 'pre' | 'post';

  /**
   * Modify config before it's resolved. The hook can either mutate the
   */
  config?: (this: void, config: UserConfig) => UserConfig | null | void | Promise<UserConfig | null | void>;

  /**
   * Use this hook to read and store the final resolved vite config.
   */
  configResolved?: (this: void, config: ResolvedConfig) => void | Promise<void>;
}

export type PluginFunctionKeys<T = Required<Plugin>> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

export type PluginOption =
  | Plugin
  | false
  | null
  | undefined
  | PluginOption[]
  | Promise<Plugin | false | null | undefined | PluginOption[]>;
export interface UserConfig {
  /**
   * Array of plugins to use.
   */
  plugins?: PluginOption[];
}

export interface ResolvedConfig extends UserConfig {
  plugins: Plugin[];
}

export const defineConfig = (config: UserConfig) => config;
