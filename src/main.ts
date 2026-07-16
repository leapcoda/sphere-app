import { createApp } from 'vue';

import App from './App.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import router from './router';
import pinia from './stores';

import '@/styles/index.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.component('svg-icon', SvgIcon);

app.mount('#app');