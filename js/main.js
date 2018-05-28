let searchInput = document.querySelector('#textQuery');
searchInput.addEventListener('keyup',() => {
    let searchText = document.querySelector('#textQuery').value;
    if(searchText != ''){
        axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180528T163234Z.bba076e88d4c4ad9.3fdb9074e8add953be6bf4f2fa1983816fbf403d&lang=pt&text=' + searchText)
        .then((response) => {
            console.log(response);
            //let translation = response;
            let translateInput = document.querySelector('#translatedText');
            translateInput.value = response.data.text[0];
        })
        .catch((err) => {
            console.log(err);
        });
    }
})
