import { createPluginContainer } from '../src/plugin';
import {expect} from "vitest"

describe('plugin', () => {
  const plugin1 = {
    name: 'test',
    config: vi.fn(() => ({
      plugins: [
        {
          name: 'mock_test',
        },
      ],
    })),
  };

  const plugin2 = {
    name: 'test2',
    config: vi.fn(() => ({
      plugins: [
        {
          name: 'mock_test2',
        },
      ],
    })),
  };

  const pluginContainer = createPluginContainer([plugin1, plugin2]);

  it('should be invoke plugin', async () => {
    const res = await pluginContainer('config', [{}]);
    expect(plugin1.config).toBeCalled();
    expect(plugin2.config).toBeCalled();
    expect(res).toMatchInlineSnapshot(`
      {
        "plugins": [
          {
            "name": "mock_test",
          },
          {
            "name": "mock_test2",
          },
        ],
      }
    `)

  });
});
