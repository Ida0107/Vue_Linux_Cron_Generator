<template>
    <div> 
        <v-radio-group 
            v-model="radioGroup" 
            @change="onChangeRadioOption"
        >
            <div class="d-flex align-center">
                <v-radio 
                    :value="0"
                    label="Every"
                />
                <v-text-field
                    type="number"
                    :value="value[2].split('/')[1]"
                    class="cron-text-field day-field"
                    outlined
                    :min="0"
                    :disabled="radioGroup!==0"
                    @input="onDayChange"
                />
                <div> {{ translate('days(s)') }} </div>
            </div>
            <v-radio 
                :value="1" 
                label="Every week day"
            />
        </v-radio-group>
        <div class="d-flex align-center select-time">
            <label>Start time</label>
            <v-select 
                :items="getHoursOrMinutes(24)" 
                outlined
                dense
                @input="(val) => onTimeChange(1, val)" 
            />
            <v-select 
                :items="getHoursOrMinutes(60)"
                outlined
                dense
                @input="(val) => onTimeChange(0, val)" 
            />
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Daily extends Vue {
    @Prop() value;

    @Prop() translate;

    @Prop() onValueChange;

    private radioGroup = 0;

    private dayValue = 1;

    getHoursOrMinutes(n) {
        let value = [];
        for(let i: any=0; i<n; i++){
            if(i<10) {
                value.push(`0${i}`);
            }else{
                value.push(i.toString())
            }
        }
        return value;
    }

    onTimeChange(position, val) {
        if(val) {
            let cronExp = this.value;
            let trimmedVal = val < 10 ? val.split('')[1] : val;
            cronExp[position] = `${trimmedVal}`; 
            this.onValueChange(cronExp);
        }
    }

    onDayChange(val) {
        console.log(val);
        this.dayValue = val;
        let cronExp = this.value;
        cronExp[2] = val ? `*/${val}` : cronExp[2];  
        this.onValueChange(cronExp);
    }

    onChangeRadioOption(value) {
        let cronExp = this.value;
        if( value) {
            cronExp[2] = '*';
            cronExp[4] = '1-5';  
        }else{
            cronExp[2] = `*/${this.dayValue}`;
            cronExp[4] = '*';  
        }
        this.onValueChange(cronExp);
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/_variables.scss';
@import '@/styles/site.scss';

.v-radio {
    width: 150px;
}

::v-deep .v-text-field__details {
    display: none !important;
}

.select-time {
    width: 65%;
    justify-content: space-around;
    margin-bottom: 10px;
}
</style>
