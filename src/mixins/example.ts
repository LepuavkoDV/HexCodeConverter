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
  mixinProp = 'mixin prop';
  mixinProp2 = 'mixin prop 2';

  async mixinMethod(): Promise<void> {
    console.log('this is mixin prop logged from mixin', this.mixinProp);
    await this.app.setMessage('message changed via mixin');
  }

  mounted(): void {
    console.log('this is another mixin prop logged from mixin mounted', this.mixinProp2);
  }
}
