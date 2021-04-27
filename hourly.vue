<template>
    <div class="d-flex align-center"> 
        <v-text-field
            type="number"
            class="cron-text-field"
            :value="value[0]"
            outlined
            :min="0"
            :max="60"
            @input="onMinuteChange"
        />
        <div> {{ translate('minute(s) past every') }} </div>
        <v-text-field
            type="number"
            :value="value[1].split('/')[1]"
            class="cron-text-field"
            outlined
            :min="1"
            :max="23"
            @input="onHourChange"
        />
        <div>{{ translate('hour(s)') }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Hourly extends Vue {
    @Prop() value;

    @Prop() translate;

    @Prop() onValueChange;

    onMinuteChange(val) {
        if((val >= 0 && val < 60) || val === '') {
            let cronExp = this.value;
            cronExp[0] = val ? `${val}` : cronExp[0];  
            this.onValueChange(cronExp);
        } 
    }

    onHourChange(val) {
        if((val > 0 && val < 24) || val === '') {
            let cronExp = this.value;
            cronExp[1] = val ? `*/${val}` : cronExp[1];  
            this.onValueChange(cronExp);
        } 
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/_variables.scss';
@import '@/styles/site.scss';

</style>
