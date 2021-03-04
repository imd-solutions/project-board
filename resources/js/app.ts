// Require the vue bootstrap.
import "./bootstrap";
// Import Vue.
import Vue from "vue";
// Import Vue Router.
import router from "./router";
// Import Vuex Store.
import store from "./store";
// Import GraphQL/ Apollo
import apolloProvider from "./plugins/apollo";
// Import Vuelidate
import Vuelidate from "vuelidate";
// Use Vuelidate
Vue.use(Vuelidate);

import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

import Buefy from "buefy";
Vue.use(Buefy);

// Use  Buetify for the DataTable
// import Table from "buefy";
// import "buefy/dist/buefy.css";
// Vue.use(Table);
// Use slide up for the bug report.
// import SlideUpDown from 'vue-slide-up-down';
// Vue.component('slide-up-down', SlideUpDown);
// Use SweetAlert.
import VueSweetalert2 from "vue-sweetalert2";
// The styles for Sweet Alert.
// import "sweetalert2/dist/sweetalert2.min.css";
// Vue.use(VueSweetalert2);

import App from "./components/App.vue";

new Vue({
    router,
    store,
    apolloProvider,
    render: h => h(App)
}).$mount("#app");
