// DOM CODE (not relevant)

const multiInput = document.getElementById('input_multi');
const singleInput = document.getElementById('input_sigle');
const trigger = document.getElementById('clicker');
const displayLabels = document.querySelectorAll('.display_output');

// CALCULATION CODE (relevant)

let multiPackPrice = 0;
let singlePackPrice = 0;
const percentageModifier = 0.95;
const discount = 5;
let priceWithDiscount = 0;
let originalPrice = 0;
let preDiscountTotal = 0;
let newSalePrice = 0;

// HELPER METHODS

const displayOutput = (val) => {
    for(let i = 0; i < displayLabels.length; i++) {
        if(displayLabels[i].innerHTML.trim() == ""){
            displayLabels[i].innerHTML = `£${val}`;
            break;
        } 
    }
}

const formatVal = (val, display = false) => {
    const format = val.toFixed(2);
    if(display) displayOutput(format);
    return parseFloat(format);
}

// CALCULATIONS

const setNewSalePrice = () => {
    newSalePrice = formatVal(preDiscountTotal * 0.9, true); 
}

const setPreDiscountTotal = () => {
    preDiscountTotal = formatVal(singlePackPrice + originalPrice, true);
    setNewSalePrice();
}

const setOriginalPrice = () => {
    originalPrice = formatVal(priceWithDiscount / percentageModifier, true);
    setPreDiscountTotal();
}

const setpriceWithDiscount = () => {
    const discountAmount = formatVal((discount / 100) * multiPackPrice, true); 
    priceWithDiscount = formatVal((multiPackPrice - discountAmount), true);
    setOriginalPrice();
}

// DOM CODE (not relevant)

const setVals = (e) => {
    e.preventDefault();
    multiPackPrice = parseFloat(multiInput.value);
    singlePackPrice = parseFloat(singleInput.value);
    !multiPackPrice > 0 || !singlePackPrice > 0
    ? alert('Please input your numbers again')
    : setpriceWithDiscount()
}

const setDispalyMulti = (e) => document.getElementById('init_multi').innerHTML = `£${e.target.value}`;
const setDisplaySingle = (e) => document.getElementById('init_single').innerHTML = `£${e.target.value}`;

multiInput.addEventListener('keyup', setDispalyMulti)
singleInput.addEventListener('keyup', setDisplaySingle)
trigger.addEventListener('click', setVals);
