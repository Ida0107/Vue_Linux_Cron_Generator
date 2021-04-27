<template>
    <div class="minutes"> 
        <div>{{ translate('Every') }}</div>
        <v-text-field
            class="cron-text-field"
            type="number"
            :value="value[0].split('/')[1]"
            outlined
            :min="0"
            :max="60"
            @input="onChange"
        />
        <div>{{ translate('minute(s)') }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Minutes extends Vue {
    @Prop() value;

    @Prop() translate;

    @Prop() onValueChange;

    private foo = 0;

    onChange(val) {
        if((val > 0 && val < 60) || val === '') {
            let cronExp = ['*','*','*','*','*' ]
            cronExp[0] = val ? `*/${val}` : val[0];  
            this.onValueChange(cronExp)
        } 
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/_variables.scss';
@import '@/styles/site.scss';

    .minutes{
        display: flex;
        align-items: center;
    }

</style>
