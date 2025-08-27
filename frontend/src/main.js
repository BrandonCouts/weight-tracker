import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import './styles.css';

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(savedTheme);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
