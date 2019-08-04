console.log('hello');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const tweetElement = document.querySelector('.tweet');
const API_URL ='http://localhost:8000/tweet';

loadingElement.style.display ='none';

listAllTweet();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const info = {
        name,
        content
    };

    
    form.style.display='none';
    loadingElement.style.display='';

    fetch(API_URL, {
        method:'POST',
        body: JSON.stringify(info),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(createdInfo => {
        form.reset() ;
        form.style.display='';
        listAllTweet();
    });

});

function listAllTweet(){
    tweetElement.innerHTML ='';
    fetch(API_URL)
    .then(response => response.json())
    .then(tweet => {
        tweet.reverse();
        tweet.forEach(info => {
            const div = document.createElement('div');

            const header = document.createElement('h3');
            header.textContent = info.name;

            const contents = document.createElement('p');
            contents.textContent = info.content;

            const date = document.createElement('small');
            date.textContent = new Date(info.created);

            
            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);

            tweetElement.appendChild(div);
        });
        loadingElement.style.display ='none';
    });
}