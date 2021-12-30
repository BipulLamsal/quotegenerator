const quote = document.querySelector(".quote");
const quoteBtn = document.querySelector('.newquote');
let authorName = document.querySelector(".name");
let speechBtn = document.querySelector(".speech");
let copyBtn = document.querySelector(".copy");
let twitterBtn = document.querySelector(".twitter");
let synth = speechSynthesis;
randomQuote();

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.textContent = "Loading...";
    document.querySelector('body').style.backgrounImage= "linear-gradient(160deg, #0094e993 0%, #80d0c7b7 100%),url('https://source.unsplash.com/random/?nature')";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quote.textContent = result.content;
        authorName.textContent = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.textContent = "New Quote";
    });
}
quoteBtn.addEventListener("click",randomQuote)
speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quote.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quote.innerText);
});
twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quote.innerText}`;
    window.open(tweetUrl, "_blank");
});
