<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld
      :prop1="app.message"
      :prop2="messageUpperCase"
      :typed-prop="getTypedProp"
      :typed-prop2="propExample.one"
      @[uiEvents.helloWorldEvent]="onHelloWorldEvent"
    />
    <button @click="mixinMethod()">ClickMe</button>
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import ExampleMixin from '@/mixins/example';
import {
  useStore,
  getModule,
  App,
  Message,
  IStore,
} from '@/store';
import { NoCache } from '@/decorators';
import { uiEvents } from '@/events';
import { IPropExample, EPropExample } from '@/types';

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends mixins(ExampleMixin) {
  store: IStore = useStore();
  app: App = getModule(App, this.store);
  message: Message = getModule(Message, this.store);
  uiEvents: Record<string, string> = uiEvents;
  propExample: typeof EPropExample = EPropExample;

  @NoCache
  get messageUpperCase(): string {
    return this.message.getMessageUpperCase;
  }

  @NoCache
  get getTypedProp(): IPropExample {
    return { name: this.messageUpperCase, value: 1 };
  }

  mounted(): void {
    this.app.setMessage('HomeView mounted: first message');
    this.message.setMessage('HomeView mounted: second message');
    console.log('HomeView mixinProp:', this.mixinProp);
  }

  onHelloWorldEvent(message: any): void {
    console.log('HomeView onHelloWorldEvent:', message);
    this.message.setMessage(message);
  }
}
</script>
