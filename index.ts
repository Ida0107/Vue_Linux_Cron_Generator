// import Daily from '../cron-tab/daily';
// import Weekly from '../cron-tab/weekly';
// import Monthly from '../cron-tab/monthly';

export const HEADER = {
    MINUTES: 'MINUTES',
    HOURLY: 'HOURLY',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY'
};

const HEADER_VALUES = {
    MINUTES: 'Minutes',
    HOURLY: 'Hourly',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly'
};

const defaultTabs = [HEADER_VALUES.MINUTES, HEADER_VALUES.HOURLY, HEADER_VALUES.DAILY, HEADER_VALUES.WEEKLY, HEADER_VALUES.MONTHLY];

export const metadata = [{
    name: 'Minutes',
    initialCron: ['*/1','*','*','*','*']
}, 
{
    name: 'Hourly',
    initialCron: ['0','*/1','*','*','*']
}, 
{
    name: 'Daily',
    initialCron: ['0','0','*/1','*','*']
}, 
{
    name: 'Weekly',
    initialCron: ['0','0','*','*','0-6']
},
{
    name: 'Monthly',
    initialCron: ['0', '0', '1', '*/1', "*"]
}
];

const validateHeaders = (headers) => {
    const validatedHeaders = [];
    headers.forEach(header => {
        if(!HEADER_VALUES[header]) {
            throw new Error('Invalid header ' + header);
            // Avoid duplicates
        } else if(validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
            validatedHeaders.push(HEADER_VALUES[header]);
        }
    });
    return validatedHeaders;
}

/**
 * Validate and load headers
 * @param {*} options 
 */
export const loadHeaders = (options) => {
    if(options) {
        if(options.headers) {
            if(!options.headers.length) {
                throw new Error('Atleast one header is required.');
            }
            return validateHeaders(options.headers);
        }
    }
    return defaultTabs;
};
