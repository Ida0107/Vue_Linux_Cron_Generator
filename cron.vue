<template>
    <v-card class="cron-builder">
        <v-tabs
            v-model="selectedTab"
            background-color="white"
            center-active
        >
            <v-tab
                v-for="(d, i) in headers"
                :key="i"
            >
                {{ d }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="selectedTab">
            <v-tab-item>
                <minutes
                    :translate="translate"
                    :value="cronValue"
                    :on-value-change="onValueChange"
                />
            </v-tab-item>
            <v-tab-item>
                <hourly
                    :translate="translate"
                    :value="cronValue"
                    :on-value-change="onValueChange"
                />
            </v-tab-item>
            <v-tab-item>
                <daily
                    :translate="translate"
                    :value="cronValue"
                    :on-value-change="onValueChange"
                />
            </v-tab-item>
            <v-tab-item>
                <weekly
                    :translate="translate"
                    :value="cronValue"
                    :on-value-change="emitCronChange"
                />
            </v-tab-item>
            <v-tab-item>
                <monthly
                    :translate="translate"
                    :value="cronValue"
                    :on-value-change="onValueChange"
                />
            </v-tab-item>
        </v-tabs-items>
        <div 
            v-if="showResultCron" 
            class="cron-builder-result"
        >
            {{ value }}
        </div>  
    </v-card>
</template>
<script lang="tsx">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import cronstrue from 'cronstrue/i18n';
import { metadata, loadHeaders } from './meta';
import Minutes from '@/cron-tab/minutes.vue';
import Hourly from '@/cron-tab/hourly.vue';
import Daily from '@/cron-tab/daily.vue';
import Weekly from '@/cron-tab/week.vue';
import Monthly from '@/cron-tab/monthly.vue';


@Component({
    components: {
        Minutes,
        Hourly,
        Daily,
        Weekly,
        Monthly,
    }
})

export default class Cron extends Vue {

    @Prop() value;

    @Prop() options;

    @Prop() locale;

    @Prop() translateFn;

    @Prop() onRef;

    @Prop() showResultCron;

    private headers = null;

    private cronlocale = 'en';

    private cronValue: any = '';

    private selectedTab = 0;

    created() {
        this.headers = loadHeaders(this.options),
        this.cronlocale= this.locale ? this.locale : 'en';
        this.cronValue = this.defaultValue(this.selectedTab);
        // this.setValue(this.value);
        if(this.translateFn && !this.locale) {
            console.log('Warning !!! locale not set while using translateFn');
        }
        if(this.onRef) {
            this.onRef(this);
        }
    }

    get formattedCronValue() {
        return this.cronValue.toString().replace(/,/g,' ').replace(/!/g, ',');
    }

    tabChanged(tab) {
        this.selectedTab = tab;
        this.cronValue = this.defaultValue(tab);
    }

    onValueChange(val) {  
        if(val && val.length) {
            this.cronValue = val;
            this.$emit('change', this.cronValue.toString().replace(/,/g,' ').replace(/!/g, ','));
        } else { 
            val = ['*','*','*','*','*']
            this.cronValue = val;
        }
    }

    emitCronChange(val) {
        this.$emit('change', val);
    }

    defaultValue(tab) {
        return metadata[tab].initialCron;
    }

    translate(key) {
        let translatedText = key;
        if(this.translateFn) {
            translatedText = this.translateFn(key);
            if(typeof translatedText !== 'string') {
                throw new Error('translateFn expects a string translation');
            }
        }
        return translatedText;
    }

    // @Watch('value') onChangeValue(newValue) {
    //     if(this.value !== newValue && this.cronValue) {
    //         let newVal = '';
    //         newVal = this.cronValue.toString().replace(/,/g,' ');
    //         newVal = newVal.replace(/!/g, ',');
    //         if(newValue !== newVal) {
    //             this.setValue(newValue) 
    //         }
    //     }
    // }

    @Watch('cronValue') onChangeCronValue() {
        this.$emit('change', this.cronValue.toString().replace(/,/g,' ').replace(/!/g, ','));
    }

    @Watch('selectedTab') onChangeSelectedTab(tab) {
        this.cronValue = this.defaultValue(tab);
    }

}
</script>
<style lang="scss" scoped>
    .cron-builder{
        width: 550px;
        padding: 20px;
        height: 335px;
    }

    .cron-builder-result {
        background: rgb(109, 106, 106);
        padding: 10px;
        text-align: center;
        color:white;
        border-radius: 4px;
        right: 20px;
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
</style>
