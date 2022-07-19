// https://restcountries.com/#api-endpoints-v3-currency

// Weekend To do
// Daniel
    // Fix the background from cutting off when it gets smaller / responsive
    // Make button a 2 way arrow
    // loading animation while waiting for fetch
    // Display popular places to go in that country as a pop up when you select a currency

// Alice
    // Add flags upon selection/click instead of submit
    // flag section formatting
    // style flag in css instead of js
    // input amount results displayed 
    // Afghani currency symbol displays after the amount instead of before...

    // Change animations ✅
    // Add flags upon submit ✅
    // Format flag aspect ratio ✅
    // Display currency symbols ✅
    // Display a banner flags that rotates


// Pseudo Code!!
// API KEY      keeps changing
// HTML
// CSS
    // Responsiveness
    // Formatting to make text clearer 
// Create form ✅
    // Create two dropdowns for source currency and target currency options and populate with the currency object
    // Create field to accept dollar amount for conversion
    // Create submit button
    // prevent default on form
// Add event listener to form on submit ✅
    // on submit, store values of source and target currencies in variables
    // store dollar amount in variable
    // do API call to obtain exchange rate
    // convert dollar amount based on exchange rate (rounded to two decimal places)
    // append dollar amount and exchange rate to the page
    // clear form to accept new inputs
// Error handling ✅
    // data validation for dollar amount input (numbers only - no strings, rounded to two decimal places)
    // make all fields required/mandatory
    // if user selects same currency, display message "The source and target currencies must be different"
    // if the user input a value of 0, display message "You have no money please input a value"
    // HTTP status code error

// Stretch goals
    // loading animation while waiting for fetch
    // other styling
    // add alt text for any images/put aria hidden=true for images intended to be background image
    // Display popular places to go in that country as a pop up when you select a currency
    // The drop down where you can select different currencies based on the API
    

    // Display currency symbol ✅
    // Display The flags of the common curriencies selected ✅
    // remove fieldset ✅
    // organize code ✅
    // If the conversion rate gives you more money have money rain down the screen  https://codepen.io/lihz27/pen/bxpEbw ✅
    // If the conversion rate gives you less money have potatoes rain down the screen ✅
    // Change earth image depending on time of day ✅
    // Animate the backgroung image ✅
    // Display a banner flags that rotates
    // A toggle button to switch the order of the curriencies ✅

const fxApp = {};

fxApp.init = () => {
    fxApp.timeOfDay();
    fxApp.populateDropDown();
    fxApp.changeEvent();
    fxApp.submitEvent();
    fxApp.currencySwitcher();
};

fxApp.background = document.querySelector('.earth');
fxApp.sourceCurrency = document.querySelector('#sourceCurrency');
fxApp.targetCurrency = document.querySelector('#targetCurrency');
fxApp.sourceFlags = document.querySelector('.sourceFlags');
fxApp.targetFlags = document.querySelector('.targetFlags');
fxApp.form = document.querySelector('form');
fxApp.inputAmount = document.querySelector('#amount');
fxApp.results = document.querySelector('.conversion');
fxApp.moneyLoader = document.querySelector('#loader');
fxApp.lastAnimatedSpan = document.querySelector('#lastAnimatedSpan');
fxApp.firstAnimatedSpan = document.querySelector('#firstAnimatedSpan');
fxApp.sourceSymbolContainer = document.querySelector('.sourceSymbolContainer');
fxApp.buttonSwitch = document.querySelector('.switch');
fxApp.selects = document.querySelectorAll('select');

fxApp.currencies = {AED: "United Arab Emirates Dirham", AFN: "Afghan Afghani", ALL: "Albanian Lek", AMD: "Armenian Dram", ANG: "Netherlands Antillean Guilder", AOA: "Angolan Kwanza", ARS: "Argentine Peso", AUD: "Australian Dollar", AWG: "Aruban Florin", AZN: "Azerbaijani Manat", BAM: "Bosnia-Herzegovina Convertible Mark", BBD: "Barbadian Dollar", BDT: "Bangladeshi Taka", BGN: "Bulgarian Lev", BHD: "Bahraini Dinar", BIF: "Burundian Franc", BMD: "Bermudan Dollar", BND: "Brunei Dollar", BOB: "Bolivian Boliviano", BRL: "Brazilian Real", BSD: "Bahamian Dollar", BTC: "Bitcoin", BTN: "Bhutanese Ngultrum", BWP: "Botswanan Pula", BYN: "New Belarusian Ruble", BYR: "Belarusian Ruble", BZD: "Belize Dollar", CAD: "Canadian Dollar", CDF: "Congolese Franc", CHF: "Swiss Franc", CLF: "Chilean Unit of Account (UF)", CLP: "Chilean Peso", CNY: "Chinese Yuan", COP: "Colombian Peso", CRC: "Costa Rican Colón", CUC: "Cuban Convertible Peso", CUP: "Cuban Peso", CVE: "Cape Verdean Escudo", CZK: "Czech Republic Koruna", DJF: "Djiboutian Franc", DKK: "Danish Krone", DOP: "Dominican Peso", DZD: "Algerian Dinar", EGP: "Egyptian Pound", ERN: "Eritrean Nakfa", ETB: "Ethiopian Birr", EUR: "Euro", FJD: "Fijian Dollar", FKP: "Falkland Islands Pound", GBP: "British Pound Sterling", GEL: "Georgian Lari", GGP: "Guernsey Pound", GHS: "Ghanaian Cedi", GIP: "Gibraltar Pound", GMD: "Gambian Dalasi", GNF: "Guinean Franc", GTQ: "Guatemalan Quetzal", GYD: "Guyanaese Dollar", HKD: "Hong Kong Dollar", HNL: "Honduran Lempira", HRK: "Croatian Kuna", HTG: "Haitian Gourde", HUF: "Hungarian Forint", IDR: "Indonesian Rupiah", ILS: "Israeli New Sheqel", IMP: "Manx pound", INR: "Indian Rupee", IQD: "Iraqi Dinar", IRR: "Iranian Rial", ISK: "Icelandic Króna", JEP: "Jersey Pound", JMD: "Jamaican Dollar", JOD: "Jordanian Dinar", JPY: "Japanese Yen", KES: "Kenyan Shilling", KGS: "Kyrgystani Som", KHR: "Cambodian Riel", KMF: "Comorian Franc", KPW: "North Korean Won", KRW: "South Korean Won", KWD: "Kuwaiti Dinar", KYD: "Cayman Islands Dollar", KZT: "Kazakhstani Tenge", LAK: "Laotian Kip", LBP: "Lebanese Pound", LKR: "Sri Lankan Rupee", LRD: "Liberian Dollar", LSL: "Lesotho Loti", LTL: "Lithuanian Litas", LVL: "Latvian Lats", LYD: "Libyan Dinar", MAD: "Moroccan Dirham", MDL: "Moldovan Leu", MGA: "Malagasy Ariary", MKD: "Macedonian Denar", MMK: "Myanma Kyat", MNT: "Mongolian Tugrik", MOP: "Macanese Pataca", MRO: "Mauritanian Ouguiya", MUR: "Mauritian Rupee", MVR: "Maldivian Rufiyaa", MWK: "Malawian Kwacha", MXN: "Mexican Peso", MYR: "Malaysian Ringgit", MZN: "Mozambican Metical", NAD: "Namibian Dollar", NGN: "Nigerian Naira", NIO: "Nicaraguan Córdoba", NOK: "Norwegian Krone", NPR: "Nepalese Rupee", NZD: "New Zealand Dollar", OMR: "Omani Rial", PAB: "Panamanian Balboa", PEN: "Peruvian Nuevo Sol", PGK: "Papua New Guinean Kina", PHP: "Philippine Peso", PKR: "Pakistani Rupee", PLN: "Polish Zloty", PYG: "Paraguayan Guarani", QAR: "Qatari Rial", RON: "Romanian Leu", RSD: "Serbian Dinar", RUB: "Russian Ruble", RWF: "Rwandan Franc", SAR: "Saudi Riyal", SBD: "Solomon Islands Dollar", SCR: "Seychellois Rupee", SDG: "Sudanese Pound", SEK: "Swedish Krona", SGD: "Singapore Dollar", SHP: "Saint Helena Pound", SLL: "Sierra Leonean Leone", SOS: "Somali Shilling", SRD: "Surinamese Dollar", STD: "São Tomé and Príncipe Dobra", SVC: "Salvadoran Colón", SYP: "Syrian Pound", SZL: "Swazi Lilangeni", THB: "Thai Baht", TJS: "Tajikistani Somoni", TMT: "Turkmenistani Manat", TND: "Tunisian Dinar", TOP: "Tongan Paʻanga", TRY: "Turkish Lira", TTD: "Trinidad and Tobago Dollar", TWD: "New Taiwan Dollar", TZS: "Tanzanian Shilling", UAH: "Ukrainian Hryvnia", UGX: "Ugandan Shilling", USD: "United States Dollar", UYU: "Uruguayan Peso", UZS: "Uzbekistan Som", VEF: "Venezuelan Bolívar Fuerte", VND: "Vietnamese Dong", VUV: "Vanuatu Vatu", WST: "Samoan Tala", XAF: "CFA Franc BEAC", XAG: "Silver (troy ounce)", XAU: "Gold (troy ounce)", XCD: "East Caribbean Dollar", XDR: "Special Drawing Rights", XOF: "CFA Franc BCEAO", XPF: "CFP Franc", YER: "Yemeni Rial", ZAR: "South African Rand", ZMK: "Zambian Kwacha (pre-2013)", ZMW: "Zambian Kwacha", ZWL: "Zimbabwean Dollar"};

fxApp.timeOfDay = () => {
    const currentDate = new Date();
    const time = currentDate.getHours();
    if (time >= 18 || time <= 6) {
        fxApp.background.src = "./assets/world-other.jpg";
    }
}


fxApp.populateDropDown = () => {
    fxApp.selects.forEach(dropdown => {
    for (let item in fxApp.currencies) {

            const optionEl = document.createElement('option');
            optionEl.innerText = fxApp.currencies[item];
            optionEl.value = item;
            dropdown.appendChild(optionEl);
        }
    });
}


fxApp.submitEvent = () => { 
    fxApp.form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // clear prior data
        fxApp.sourceFlags.innerHTML = '';
        fxApp.targetFlags.innerHTML = '';
        fxApp.moneyLoader.classList.remove('money');
        fxApp.moneyLoader.classList.remove('potato');
        
        fxApp.selectedSourceCurrency = fxApp.sourceCurrency.selectedOptions[0].value;
        fxApp.selectedTargetCurrency = fxApp.targetCurrency.selectedOptions[0].value;
        console.log(fxApp.selectedTargetCurrency);
        fxApp.amountValue =  fxApp.inputAmount.value;
        
        if(fxApp.amountValue <= 0){
            alert("You have no money. Please don't travel")
        } else {
        if(fxApp.selectedSourceCurrency !== fxApp.selectedTargetCurrency){
            fxApp.getExchangeRate();
        }else{
            alert('Please select different currencies')
        }
        }
    })
}

fxApp.changeEvent = () => {
    fxApp.selects.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            fxApp.selectedCurrency = dropdown.selectedOptions[0].value;
            // console.log(fxApp.selectedCurrency);
            if (dropdown.id == 'sourceCurrency') {
                fxApp.getSourceFlag(fxApp.selectedCurrency);
            } else {
                fxApp.getTargetFlag(fxApp.selectedCurrency);
            }
        })
    });
}

fxApp.getExchangeRate = () => {
    fxApp.url = new URL("https://api.apilayer.com/currency_data/live");
    
    fxApp.url.search = new URLSearchParams({
        apikey: 'nOLSelb7kcBJf73SMIYYzjJ3oaRz3Umn',
        source: `${fxApp.selectedSourceCurrency}`,
        currencies: `${fxApp.selectedTargetCurrency}`
    });
    
    fetch(fxApp.url).then(function(response){
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(function(results){
        fxApp.displayConversion(results)

        fxApp.makeItRain();
        fxApp.makeItRainListener();
    })
    .catch(err => {
        if (err.message === "Not Found") {
            alert("We couldn't find that exchange rate! Maybe try a different one?");
        } else {
            alert("Something went wrong and I have no idea what");
            console.log(err)
        }
    })
}


fxApp.displayConversion = (results) => {
    fxApp.exchangeRate = results.quotes[`${fxApp.selectedSourceCurrency}${fxApp.selectedTargetCurrency}`];
        fxApp.convertedAmount = (fxApp.amountValue * fxApp.exchangeRate).toFixed(2);

        fxApp.sourceSymbolContainer.innerText = fxApp.sourceSymbol;

        fxApp.results.innerHTML = `
        <h2>Exchange Rate</h2>
        <p>${fxApp.exchangeRate}</p>
        <h2>Converted Amount</h2>
        <p>${fxApp.targetSymbol} ${fxApp.convertedAmount}</p>
        `;
}


fxApp.currencySwitcher = () => {
    fxApp.buttonSwitch.addEventListener('click', () => {
        if(fxApp.sourceCurrency.selectedOptions[0].innerText != 'Choose your source currency'){
            let selectedSourceInnerText = fxApp.sourceCurrency.selectedOptions[0].innerText;
            let selectedSourcevalue = fxApp.sourceCurrency.selectedOptions[0].value;
            
            let selectedTargetInnerText = fxApp.targetCurrency.selectedOptions[0].innerText;
            let selectedTargetvalue = fxApp.targetCurrency.selectedOptions[0].value;
            
            fxApp.targetCurrency.selectedOptions[0].innerText = selectedSourceInnerText;
            fxApp.targetCurrency.selectedOptions[0].value =  selectedSourcevalue;
            
            fxApp.sourceCurrency.selectedOptions[0].innerText = selectedTargetInnerText;
            fxApp.sourceCurrency.selectedOptions[0].value = selectedTargetvalue;
        }
    })
}


fxApp.makeItRainListener = () => {
    fxApp.lastAnimatedSpan.addEventListener('animationend', () => {
        fxApp.moneyLoader.style.zIndex = "-10";
    });
    fxApp.firstAnimatedSpan.addEventListener('animationstart', () => {
        fxApp.moneyLoader.style.zIndex = "10";
    });
}


fxApp.makeItRain = () => {
    if (Number(fxApp.convertedAmount) > Number(fxApp.amountValue)){
        fxApp.moneyLoader.classList.add('money');
    } else{
        fxApp.moneyLoader.classList.add('potato');
    }
}


fxApp.getSourceFlag = (currencyCode) => {
    fxApp.urlFlag = new URL(`https://restcountries.com/v3.1/currency/${currencyCode}`);

    fetch(fxApp.urlFlag).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
        .then(function (results) {
            // console.log(results);
            fxApp.sourceFlags.innerHTML = '';
            fxApp.sourceSymbol = results[0].currencies[currencyCode].symbol;
            results.forEach(country => {
                fxApp.flagURL = country.flags.png;
                fxApp.divEl = document.createElement('div');
                fxApp.divEl.style.width = '30px';
                fxApp.divEl.style.height = '20px';
                fxApp.divEl.innerHTML = `
                <img src=${fxApp.flagURL}>;
                `;
                fxApp.sourceFlags.append(fxApp.divEl);
            })
        })
}


fxApp.getTargetFlag = (currencyCode) => {
    fxApp.urlFlag = new URL(`https://restcountries.com/v3.1/currency/${currencyCode}`);

    fetch(fxApp.urlFlag).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
        .then(function (results) {
            fxApp.targetFlags.innerHTML = '';
            fxApp.targetSymbol = results[0].currencies[currencyCode].symbol;
            results.forEach(country => {
                fxApp.flagURL = country.flags.png;
                fxApp.divEl = document.createElement('div');
                fxApp.divEl.style.width = '30px';
                fxApp.divEl.style.height = '20px';
                fxApp.divEl.style.margin = '5px';
                fxApp.divEl.innerHTML = `
                <img src=${fxApp.flagURL}>
                `;
                fxApp.targetFlags.append(fxApp.divEl);
            });
        })
}


fxApp.init();