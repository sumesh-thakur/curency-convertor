let fromcurr = document.querySelector(".from select ")
let tocurr = document.querySelector(".to select ")
const msg= document.querySelector(".msg")
let baseUrl ="https://api.exchangerate-api.com/v4/latest/"
let dropdown =document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")






const updateExchangeRate = ()=>{
         let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === '' || amtVal<1){
        amtVal=1
        amount.value="1"
    }


    

    const Url= `${baseUrl}${fromcurr.value}`
    
    fetch(Url)
    .then(response=>response.json())
    .then((resp)=>{
        let data = resp;
        let rate=resp.rates[tocurr.value];
        // console.log("INR Rate:", rate);

       
        
        let finalAmount= amount.value * rate ;
        msg.innerText=`${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
        
    })
}


window.addEventListener("load",()=>{
    updateExchangeRate();
})



for (let select of dropdown){
    for(currency_code in countryList){
        let newOption = document.createElement("option")
        newOption.innerText=currency_code ;
        newOption.value= currency_code
        if (select.name === "from" && currency_code==="USD"){
            newOption.selected="selected"
        }
        else if (select.name === "to" && currency_code==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
        })
}


const updateFlag = (element)=>{
    let currency_code = element.value ;
    let countryCode=countryList[currency_code];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    console.log(newSrc)
    element.parentElement.querySelector("img").src=newSrc   
}



btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})


