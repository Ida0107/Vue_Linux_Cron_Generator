import Vue from 'vue';
import Application from '@/App.vue';
import vuetify from '@/plugins/vuetify';

// function requireAll(r: any) {
//     r.keys().forEach(r);
// }

// requireAll(require.context('@/Assets/Icons/common', true, /\.svg$/));

new Vue({
    vuetify,
    render: (h) => h(Application),
}).$mount('#app');
