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
})
export default class HomeView extends mixins(ExampleMixin) {
  store: Store<IStoreState> = useStore();
  app: App = getModule(App, this.store);
  message: Message = getModule(Message, this.store);
  uiEvents: Record<string, string> = uiEvents;

  @NoCache
  get messageUpperCase(): string {
    return this.message.getMessageUpperCase;
  }

  mounted(): void {
    this.app.setMessage('HomeView mounted: first message');
    this.message.setMessage('HomeView mounted: second message');
    console.log('HomeView mixinProp:', this.mixinProp);
  }

  onHelloWorldEvent(message: any): void {
    console.log('HomeView onHelloWorldEvent:', message);
    this.app.setMessage(message);
  }
}
</script>
