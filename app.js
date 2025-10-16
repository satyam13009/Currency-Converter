let baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

let dropdowns=document.querySelectorAll(".dropdown select");
let button=document.querySelector('form button');
let fromCurrency=document.querySelector(".from select");
let toCurrency=document.querySelector(".to select");
let p=document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newopt=document.createElement("option");
        newopt.innerText=currcode;
        newopt.value=currcode;
        if(select.id==="f" && currcode==="USD"){
            newopt.selected="selected"
        }else if(select.id==="t" && currcode==="INR"){
            newopt.selected="selected"
        }
        select.append(newopt)
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

function updateFlag(element){
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let imglink=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.previousElementSibling;
    img.src=imglink;
    
    
}

button.addEventListener('click',async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amval=amount.value;
    if(amval=="" || amval<1){
        amval=1;
        amount.value="1"
    }
    let from=fromCurrency.value.toLowerCase();
    let to=toCurrency.value.toLowerCase();


    const url=`${baseurl}${from}.json`

    let res=await fetch(url);
    let data=await res.json();
    let rate=data[from][to];

    let finalval=amval*rate;
    p.innerText=`${amval} ${fromCurrency.value} is equivalent of ${finalval} ${toCurrency.value}`;

    console.log(finalval)
})


