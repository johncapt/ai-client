//import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';

// import Primevue components
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Stepper from 'primevue/stepper';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import StepperPanel from 'primevue/stepperpanel';
import ContextMenu from 'primevue/contextmenu';
import Password from 'primevue/password';
import OverlayPanel from 'primevue/overlaypanel';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Steps from 'primevue/steps';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import Sidebar from 'primevue/sidebar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.use(createPinia());
app.use(router);

// add primevue components
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('SelectButton', SelectButton);
app.component('Toast', Toast);
app.component('Stepper', Stepper);
app.component('Avatar', Avatar);
app.component('Dialog', Dialog);
app.component('StepperPanel', StepperPanel);
app.component('ContextMenu', ContextMenu);
app.component('Password', Password);
app.component('Button', Button);
app.component('InputGroup', InputGroup);
app.component('InputGroupAddon', InputGroupAddon);
app.component('Dropdown', Dropdown);
app.component('Textarea', Textarea);
app.component('Sidebar', Sidebar);
app.component('OverlayPanel', OverlayPanel);
app.component('InputText', InputText);
app.component('ProgressSpinner', ProgressSpinner);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Steps', Steps);

app.mount('#app');
