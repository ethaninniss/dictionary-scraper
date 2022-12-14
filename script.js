let sentence;

document.getElementById("sentence-button").onclick = function() {
    sentence = document.getElementById("sentence").value;
    console.log(sentence);
    splitSentence().forEach(e => wordFetch(e));
    // wordFetch();
};

const splitSentence = () => {
    const words = sentence.split(' ');
    const wordsWithoutPunctuation = words.map(word => word.replace(/\W/, ''));
    return wordsWithoutPunctuation;
};




async function wordFetch(word) { // https://api.dictionaryapi.dev/api/v2/entries/en/hello
    let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data = await res.json();
    let todoData = await data;
    console.log(todoData);
}



