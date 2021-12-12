const quoteText = document.querySelector('.quote'),
    authorName = document.querySelector('.author .name'),
    quoteBtn = document.querySelector('#quoteBtn'),
    soundBtn = document.querySelector('.sound'),
    copyBtn = document.querySelector('.copy'),
    twitterBtn = document.querySelector('.twitter');


randomQuote = () => {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch('https://api.quotable.io/random').then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote"
        quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteText.innerText);
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "10",
        "hideDuration": "5",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.success('Copied to clipboard!');

});

twitterBtn.addEventListener('click', () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText} -- ${authorName.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener('click', randomQuote);