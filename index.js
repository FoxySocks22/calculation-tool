// DOM CODE (not relevant)

const newTwin = document.getElementById('new_twin');
const multiInput = document.getElementById('input_multi');
const singleInput = document.getElementById('input_sigle');
const tripleInput = document.getElementById('input_triple');
const trigger = document.getElementById('clicker');
const displayLabels = document.querySelectorAll('.display_output');

// CALCULATION CODE (relevant)

let newTwinPrice = 0;
let singlePackPrice = 0;
let multiPackPrice = 0;
let triplePackPrice = 0;

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
    return format;
}

const grossUp = (val, percentage) => {
    return val / percentage;
}

// CALCULATIONS

const setDiscountedTripplePrice = (val) => {
    formatVal(val * .9, true);
}

const setNewTripplePrice = () => {
    setDiscountedTripplePrice(formatVal(singlePackPrice + grossUp(newTwinPrice, .95), true));
}

const setOldTripleGrossedUp = () => {
    formatVal(grossUp(triplePackPrice, .9), true);
    setNewTripplePrice();
}

const setOldTwinGrossedUp = () => {
    formatVal(grossUp(multiPackPrice, .95), true);
    setOldTripleGrossedUp();
}

const setSinglePrice = () => {
    formatVal(singlePackPrice, true);
    setOldTwinGrossedUp();
}

// DOM CODE (not relevant)

const setVals = (e) => {
    e.preventDefault();
    newTwinPrice = parseFloat(newTwin.value);
    singlePackPrice = parseFloat(singleInput.value);
    multiPackPrice = parseFloat(multiInput.value);
    triplePackPrice = parseFloat(tripleInput.value);
    !multiPackPrice > 0 || !singlePackPrice > 0 || !newTwinPrice > 0 || !triplePackPrice > 0
    ? alert('Please input your numbers again')
    : setSinglePrice()
}

const setDisplayNew = (e) => document.getElementById('twin_new').innerHTML = `£${e.target.value}`;
const setDisplaySingle = (e) => document.getElementById('init_single').innerHTML = `£${e.target.value}`;
const setDispalyMulti = (e) => document.getElementById('init_multi').innerHTML = `£${e.target.value}`;
const setDisplayTriple = (e) => document.getElementById('init_triple').innerHTML = `£${e.target.value}`;

newTwin.addEventListener('keyup', setDisplayNew);
singleInput.addEventListener('keyup', setDisplaySingle);
multiInput.addEventListener('keyup', setDispalyMulti);
tripleInput.addEventListener('keyup', setDisplayTriple);

trigger.addEventListener('click', setVals);