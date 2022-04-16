import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { store, key } from './store';

const app = createApp(App);
// @ts-ignore
app.config.devtools = true;

app.use(store, key)
  .use(router)
  .mount('#app');
