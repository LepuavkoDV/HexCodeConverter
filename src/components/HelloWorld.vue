<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ msg2 }}</h1>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component';
import { Prop, Watch, Vue } from 'vue-property-decorator';
import { uiEvents } from '@/events';

@Options({
  emits: [uiEvents.helloWorldEvent],
})
export default class HelloWorld extends Vue {
  @Prop(String) readonly msg: string | undefined;
  @Prop(String) readonly msg2: string | undefined;

  @Watch('msg')
  onMsgChange(msg: string): void {
    console.log('HelloWorld onMsgChange');
    this.$emit(uiEvents.helloWorldEvent, msg);
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
