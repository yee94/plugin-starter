
# Plugin Starter

**WIP** 

It's a starter template for creating a core of plugin.

Inspired by [vite](https://vitejs.dev/). I very like the plugin design of [vite](https://vitejs.dev/). It's very simple and easy to use.

```bash
npx degit yee94/plugin-starter <project name>
```

## Features

- **defineConfig / TypeScript Support**. What ever you are writing a plugin or a config, you can jump to the definition to check the type & comment. It's very useful for our users to define a config. The ts can help our user to check the type & comment.
- **Function Plugin**. We can use function to create a plugin. It's very easy to understand.
- **Plugin can include other plugins**. This can make us combine some plugins to a new plugin.
- **Plugin enforce**. Instead of using `order` to control the plugin order, we can use `enforce` to control the plugin order. It's more clear and easy to use.
- **Plugin can be async**. We can use `async` to make a plugin async. It's very useful when we want to do some async things in a plugin.
- **Config modify**. Actually most of the plugins are used to modify the config. So we already provide some hooks to modify the config.




