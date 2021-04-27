<template>
    <div> 
        <div class="d-flex week-day">
            <v-checkbox
                v-for="day in Object.keys(days)"
                :key="day"
                v-model="selectedDays"
                :label="days[day]"
                color="info"
                :value="day"
                hide-details
                @change="onSelectedDaysChange"
            />
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
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Weekly extends Vue {
    @Prop() value;

    @Prop() translate;

    @Prop() onValueChange;

    private selectedDays = ["0","1","2","3","4","5","6"];

    private days = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    };

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

    @Watch('selectedDays') onSelectedDaysChange(val){
        let cronExp = this.value;
        if(val.length === 7) {
            cronExp[4] = '0-6';
            cronExp = cronExp.toString().replace(/,/g,' ').replace(/!/g, ',');
        }else{
            cronExp[4] = '';
            cronExp = cronExp.toString().replace(/,/g,' ').replace(/!/g, ',');
            val.forEach((d, i)=> {
                cronExp = i=== 0 ? cronExp.concat(' ', d ) : cronExp.concat(',', d ) ;
            });
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

.week-day{
    flex-wrap: wrap;
    margin-bottom: 20px;
}
</style>
