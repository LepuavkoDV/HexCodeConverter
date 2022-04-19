export interface IPluginExample {
  pluginMethod: (name: string) => string;
}

export class PluginExample implements IPluginExample {
  // eslint-disable-next-line class-methods-use-this
  pluginMethod(name: string): string {
    return `Hello ${name}`;
  }
}
