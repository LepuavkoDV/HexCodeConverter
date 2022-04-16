<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld
      :msg="app.message"
      :msg2="messageUpperCase"
      @[uiEvents.helloWorldEvent]="onHelloWorldEvent"
    />
    <button @click="mixinMethod()">ClickMe</button>
  </div>
</template>

<script lang="ts">
import {
  Options,
  mixins,
} from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import ExampleMixin from '@/mixins/example';
import {
  useStore,
  getModule,
  App,
  Message,
  Store,
  IStoreState,
} from '@/store';
import { NoCache } from '@/decorators';
import { uiEvents } from '@/events';

@Options({
  components: {
    HelloWorld,
  },
  watch: {
    'app.message': (newValue) => {
      console.log('watcher', newValue);
    },
  },
})
export default class HomeView extends mixins(ExampleMixin) {
  store: Store<IStoreState> = useStore();
  app: App = getModule(App, this.store);
  message: Message = getModule(Message, this.store);
  uiEvents: any = uiEvents;

  @NoCache
  get messageUpperCase(): string {
    return this.message.getMessageUpperCase;
  }

  mounted(): void {
    this.app.setMessage('message from first module');
    this.message.setMessage('message from second module');
    console.log('this is mixin prop logged from component', this.mixinProp);
  }

  // eslint-disable-next-line class-methods-use-this
  onHelloWorldEvent($e: any): void {
    console.log('onHelloWorldEvent', $e);
  }
}
</script>
