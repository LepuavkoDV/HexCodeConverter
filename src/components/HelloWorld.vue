<template>
  <div class="hello">
    <h1>{{ prop1 }}</h1>
    <h1>{{ prop2 }}</h1>
    <h1>{{ typedProp }}</h1>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options } from 'vue-class-component';
import {
  Prop, Watch, Emit, Vue,
} from 'vue-property-decorator';
import { uiEvents } from '@/events';
import { IPropExample } from '@/types';

@Options({
  emits: [uiEvents.helloWorldEvent],
})
export default class HelloWorld extends Vue {
  @Prop(String) readonly prop1!: string;
  @Prop(String) readonly prop2!: string;
  @Prop({ type: Object as PropType<IPropExample> }) readonly typedProp!: IPropExample;

  @Watch('msg')
  @Emit(uiEvents.helloWorldEvent)
  // eslint-disable-next-line class-methods-use-this
  onMsgChange(msg: string): void {
    console.log('HelloWorld onMsgChange', msg);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
