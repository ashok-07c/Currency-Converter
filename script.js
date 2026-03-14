//  "https://v6.exchangerate-api.com/v6/82cc88d427930f43d959a3bf/latest/"; currency converter api
// https://flagsapi.com/US/flat/64.png flags api
let URL = `https://v6.exchangerate-api.com/v6/82cc88d427930f43d959a3bf/latest`
let dropdowns = document.querySelectorAll(".dropdown select");
let amount = document.querySelector(".amount input");
let from = document.querySelector("#fromCountry");
let to = document.querySelector("#toCountry");
let msg = document.querySelector(".msg");
let btn = document.querySelector(".container button");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.value = currCode;
        newOpt.innerText = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOpt.selected = 'selected';
        }
        else if(select.name === 'to' && currCode === 'INR'){
            newOpt.selected = 'selected';
        }
        select.append(newOpt)
    }
    select.addEventListener('change',(e) => {
        updateFlag(e.target);
    })
}

const updateFlag = (ele) => {
    let countryCode = countryList[ele.value]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
}

const getExchangeRate = async () => {
    let amt = amount.value;
    if (amt === "" || amt < 1) {
        amt = 1;
        amount.value = "1";
    }

    let fromCoun = from.value;
    let toCoun = to.value;
    let url = `${URL}/${fromCoun}`;
    let response = await fetch(url);
    let data = await response.json();
    let value = data.
    conversion_rates[toCoun];
    let total = amt*value;
    msg.innerHTML = `${amt}${fromCoun} = ${total}${toCoun}`;

}

btn.addEventListener('click',getExchangeRate);
document.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        getExchangeRate();
    }
});