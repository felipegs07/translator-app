let searchInput = document.querySelector('#textQuery');
searchInput.addEventListener('keyup',() => {
    let searchText = document.querySelector('#textQuery').value;
    
    axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180528T163234Z.bba076e88d4c4ad9.3fdb9074e8add953be6bf4f2fa1983816fbf403d&lang=' + search + '&apikey=thewdb')
    .then((response) => {
        let translation = response;
    })
    .catch((err) => {
        console.log(err);
});
})