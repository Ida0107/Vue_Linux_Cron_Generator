import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    options: {
        customProperties: true,
    },
    theme: {
        themes: {
            light: {
                primary: '#4AA7A9',
                secondary: '#2B2B2B',
                accent: '#8c9eff',
                error: '#D52B1E',
            },
        },
    },
});
