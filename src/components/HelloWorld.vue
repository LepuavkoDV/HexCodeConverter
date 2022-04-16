<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ msg2 }}</h1>
  </div>
</template>

<script lang="ts">
import {
  Options,
  Vue,
} from 'vue-class-component';
import { uiEvents } from '@/events';

@Options({
  props: {
    msg: String,
    msg2: String,
  },
  emits: [uiEvents.helloWorldEvent],
  watch: {
    msg(msg: string) {
      this.onMsgChange(msg);
    },
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
  msg2!: string;

  onMsgChange(msg: string): void {
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
