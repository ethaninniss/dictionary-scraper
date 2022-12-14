let sentence;

document.getElementById("sentence-button").onclick = function() {
    sentence = document.getElementById("sentence").value;
    console.log(sentence);
    splitSentence().forEach(e => wordFetch(e));
};

const splitSentence = () => {
    const words = sentence.split(' ');
    const wordsWithoutPunctuation = words.map(word => word.replace(/\W/, ''));
    console.log(wordsWithoutPunctuation);
    return wordsWithoutPunctuation;
};



async function wordFetch(word) {
    let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data = await res.json();
    let todoData = await data;
    console.log(todoData);
    makeCard(todoData);
}


const makeCard = function(arr) {
    // const element = Array.from(document.getElementsByClassName("card-output"));
    // element.forEach(x => x.remove());

    // card
    const cardContainer = document.getElementById("card-output");
    let card = document.createElement("div");
    cardContainer.appendChild(card);
    card.setAttribute("class", "card");
    card.style = "border: 1px solid red";

    // word
    let word = document.createElement("h3");
    word.innerHTML = arr[0].word;
    word.setAttribute("class", "word");
    card.appendChild(word);

    // pronunciation
    let pronunciation = document.createElement("p");
    pronunciation.innerHTML = arr[0].phonetic;
    pronunciation.setAttribute("class", "pronunciation");
    card.appendChild(pronunciation);
    // when clicked will play audio of pronunciation
    pronunciation.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("this is clicking");
        const audio = arr[0].phonetics[0].audio;
        new Audio(audio).play();
    });

    // definition
    let definition = document.createElement("p");
    definition.innerHTML = arr[0].meanings[0].definitions[0].definition;
    definition.setAttribute("class", "definition");
    card.appendChild(definition);
    // when clicked will cycle through definitions
    let definitionClickCounter = 1;
    definition.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("this is clicking");
        definition.innerHTML = arr[0].meanings[0].definitions[definitionClickCounter].definition;
        // definition.innerHTML = arr[0].meanings[partOfSpeechCounter].definitions[definitionClickCounter].definition;
        definitionClickCounter++;
        if (definitionClickCounter === arr[0].meanings[0].definitions.length) definitionClickCounter = 0;
    });
    
    // part of speech
    let partOfSpeech = document.createElement("p");
    partOfSpeech.innerHTML = arr[0].meanings[0].partOfSpeech;
    partOfSpeech.setAttribute("class", "part-of-speech");
    card.appendChild(partOfSpeech);
    // when clicked will cycle through part of speech
    let partOfSpeechCounter = 1;
    partOfSpeech.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("this is clicking");
        // definitionClickCounter = 0;
        partOfSpeech.innerHTML = arr[0].meanings[partOfSpeechCounter].partOfSpeech;
        // definition.innerHTML = arr[0].meanings[partOfSpeechCounter].definitions[definitionClickCounter].definition;
        partOfSpeechCounter++;
        if (partOfSpeechCounter === arr[0].meanings.length) partOfSpeechCounter = 0;
    });
};
