<template>
    <v-app id="app w-100">
        <cron
            :value="value"
            :show-result-cron="true"
            @change="onChange"
        /> 
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cron from '@/lib';

@Component({
    components: {
        Cron,
    },
})

export default class App extends Vue {
    private value = '*/1 * * * *';

    onChange(e) {
        this.value = e;
    }

    
    translate(key) {
        let translatedText = key;
        return translatedText;
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
