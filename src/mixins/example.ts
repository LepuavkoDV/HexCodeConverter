import { Options, Vue } from 'vue-class-component';
import {
  useStore,
  getModule,
  App,
  Store,
  IStoreState,
} from '@/store';

@Options({})
export default class ExampleMixin extends Vue {
  store: Store<IStoreState> = useStore();
  app: App = getModule(App, this.store);
  mixinProp = 'mixinPropValue';
  mixinProp2 = 'mixinProp2Value';

  async mixinMethod(): Promise<void> {
    console.log('ExampleMixin mixinMethod:', this.mixinProp);
    await this.app.setMessage('ExampleMixin mixinMethod: new app message');
  }

  mounted(): void {
    console.log('ExampleMixin mounted:', this.mixinProp2);
  }
}
