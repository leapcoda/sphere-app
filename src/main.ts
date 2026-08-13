import { createApp } from 'vue';
import TDesign from 'tdesign-mobile-vue';

import App from './App.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import router from './router';
import pinia from './stores';

import 'tdesign-mobile-vue/es/style/index.css';
import '@/styles/index.css';

const app = createApp(App);

app.use(TDesign);
app.use(router);
app.use(pinia);
app.component('svg-icon', SvgIcon);

app.mount('#app');