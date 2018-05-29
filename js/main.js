/**
    GLOBAL VARIABLES/DOM OBJECTS
 */
let searchInput = document.querySelector('#textQuery');
let selectEl = document.querySelector('#inputGroupSelect01');
let selectedLang = 'pt';

/**
    FUNCTIONS
 */
function getLanguages(){
    axios.get('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20180528T163234Z.bba076e88d4c4ad9.3fdb9074e8add953be6bf4f2fa1983816fbf403d&ui=en')
    .then((response) => {
        console.log(response);
        let languages = response.data.langs;
        let num = 0;

        let languageCode = {
            name:'',
            code:''
        }
        
        languageCode.code = Object.keys(languages);
        for(language in languages) {
            languageCode.name = languages[language];
            languageCode.code = language;
            console.log(languageCode);
            let option = document.createElement('option');
            option.innerHTML = languageCode.name;
            option.value = languageCode.code;
            selectEl.appendChild(option);

        }
 
 
    })
    .catch((err) => {
        console.log(err);
    });
}

function translateText(){
    let searchText = document.querySelector('#textQuery').value;
    if(searchText != ''){
        axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180528T163234Z.bba076e88d4c4ad9.3fdb9074e8add953be6bf4f2fa1983816fbf403d&lang=' + selectedLang + '&text=' + searchText)
        .then((response) => {
            //console.log(response);
            //let translation = response;
            let translateInput = document.querySelector('#translatedText');
            translateInput.value = response.data.text[0];
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

/*
    EVENTS
*/
searchInput.addEventListener('keyup',() => {
    translateText();
})

selectEl.addEventListener('change',() => {
    selectedLang = selectEl.options[selectEl.selectedIndex].value;
    translateText();
})


/*
    MAIN
 */
getLanguages();
