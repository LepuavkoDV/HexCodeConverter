import { App } from 'vue';
import { IPluginExample, PluginExample } from './plugin';

export default {
  install: (app: App) => {
    app.config.globalProperties.plugin = new PluginExample();
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    plugin: IPluginExample;
  }
}
