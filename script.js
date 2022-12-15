let sentence;

document.getElementById("sentence-button").onclick = function() {
    sentence = document.getElementById("sentence").value;
    console.log(sentence);
    splitSentence().forEach(e => wordFetch(e));
};

const splitSentence = () => {
    const words = sentence.split(' ');
    const wordsWithoutPunctuation = words.map(word => word.replace(/\W/, ''));
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
    // document.getElementsByClassName("card").border = "1px solid red";
    
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
    
    // definition
    let definition = document.createElement("p");
    definition.innerHTML = arr[0].meanings[0].definitions[0].definition;
    definition.setAttribute("class", "definition");
    card.appendChild(definition);
};
