import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

import { date, currency } from './methods/filters';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};

app.use(router);
app.use(VueAxios, axios);
app.component('Loading', Loading);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
