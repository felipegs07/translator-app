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
        let languages = response.data.langs;
        let languageCode = {
            name:'',
            code:''
        }
        for(language in languages) {
            languageCode.name = languages[language];
            languageCode.code = language;
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

function translateText(textArg){
    let searchText;
    if(textArg == ''){
        searchText = document.querySelector('#textQuery').value;
    }
    else{
        searchText = textArg;
    }

    if(searchText != ''){
        axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180528T163234Z.bba076e88d4c4ad9.3fdb9074e8add953be6bf4f2fa1983816fbf403d&lang=' + selectedLang + '&text=' + searchText)
        .then((response) => {
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
    translateText('');
})

selectEl.addEventListener('change',() => {
    selectedLang = selectEl.options[selectEl.selectedIndex].value;
    translateText('');
})

window.addEventListener('DOMContentLoaded', (e) => {
    let speakBtn = document.querySelector('#speakBtn');
    if(window.SpeechRecognition || window.webkitSpeechRecognition){
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new SpeechRecognition();

        speakBtn.addEventListener('click', (e) => {
            recognition.start();
        })
        
        recognition.addEventListener('result', (e) => {
            let result = e.results[0][0].transcript;
            document.querySelector('#textQuery').value = result;
            translateText(result);
        })
    }
    else{
        console.log('Error on speech recognition :(');
    }
})

/*
    MAIN
 */
getLanguages();
