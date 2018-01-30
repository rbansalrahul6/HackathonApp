export function convert(value) {
    var money = {};
    if(value >= 10000000) {
        money.value = value/10000000;
        money.suffix = 'Cr';
    }
    else if(value<10000000 && value>=100000) {
        money.value = value/100000;
        money.suffix = 'L';
    }
    else {
        money.value = value/1000;
        money.suffix = 'K';
    }
    return money;
}