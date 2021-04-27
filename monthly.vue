<template>
    <div> 
        <div class="d-flex align-center"> 
            <v-text-field
                type="number"
                class="month-text-field"
                :value="value[2]"
                outlined
                :min="0"
                :max="31"
                @input="onDayChange"
            />
            <div> {{ translate('day every') }} </div>
            <v-text-field
                type="number"
                :value="value[3].split('/')[1]"
                class="month-text-field"
                outlined
                :min="1"
                :max="12"
                @input="onMonthChange"
            />
            <div>{{ translate('month(s)') }}</div>
        </div>
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
export default class Monthly extends Vue {
    @Prop() value;

    @Prop() translate;

    @Prop() onValueChange;

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
        if((val >= 0 && val < 60) || val === '') {
            let cronExp = this.value;
            cronExp[2] = val ? `${val}` : cronExp[2];  
            this.onValueChange(cronExp);
        } 
    }

    onMonthChange(val) {
        if((val > 0 && val < 24) || val === '') {
            let cronExp = this.value;
            cronExp[3] = val ? `*/${val}` : cronExp[3];  
            this.onValueChange(cronExp);
        } 
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

.month-text-field{
    margin: 24px 10px 20px !important;
}

</style>
