export function convert(value) {
    var money = {};
    if(value >= 10000000) {
        money.value = parseFloat(Number(value/10000000).toFixed(2));
        money.suffix = 'Cr';
    }
    else if(value<10000000 && value>=100000) {
        money.value = parseFloat(Number(value/100000).toFixed(2));
        money.suffix = 'L';
    }
    else {
        money.value = parseFloat(Number(value/1000).toFixed(2));
        money.suffix = 'K';
    }
    return money;
}