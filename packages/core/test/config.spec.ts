import { resolveConfig } from '../src/config';
import { Plugin, PluginOption } from '../src/types';

describe('config', () => {
  it('should be get config from plugin', async () => {
    const result = await resolveConfig({
      plugins: [
        {
          name: 'test',
          config: async (config) => {
            return {
              ...config,
              test: {
                globals: true,
                passWithNoTests: true,
              },
            };
          },
        },
      ],
    });

    expect(result).toMatchInlineSnapshot(`
      {
        "plugins": [
          {
            "config": [Function],
            "name": "test",
          },
        ],
        "test": {
          "globals": true,
          "passWithNoTests": true,
        },
      }
    `);
  });

  it('should be flat plugin array', async () => {
    const preset = () =>
      [
        [
          {
            name: 'test',
          },
          null,
          {
            name: 'test2',
          },
          {
            name: 'test3',
            enforce: 'pre',
          },
        ],
        {
          name: 'test4',
        },
      ] as PluginOption;

    const result = await resolveConfig({
      plugins: [
        preset(),
        {
          name: 'test5',
          enforce: 'pre',
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });
});
