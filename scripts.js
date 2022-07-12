// Pseudo Code!!
// endangered species
// API KEY      qyMdg8B7htfh5KfYdW8eFfCvujdi5DUKtbjfuX1uFUkxmTvODo
// 
// 
// 
// 
// 
// 

const url = new URL("https://api.apilayer.com/currency_data/live?apikey=8MRP1EqTA1loXIdomdq0Zf71wBP3vnRS&source=EUR&currencies=EUR")

//  url.search = new URLSearchParams({
//     apikey: '8MRP1EqTA1loXIdomdq0Zf71wBP3vnRS',
//     source: 'CAD',
//     currencies: 'CAD'

// })
console.log(url);

fetch(url).then(function(responce){
    return responce.json();
})
.then(function(results){
    const newArray = results.data;
    console.log(newArray);
})

// var myHeaders = new Headers();
// myHeaders.append("apikey", "8MRP1EqTA1loXIdomdq0Zf71wBP3vnRS");

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow',
//   headers: myHeaders
// };

// fetch("https://api.apilayer.com/currency_data/live?source='EUR'&currencies=EUR", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));