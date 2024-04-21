const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

//set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = ["The quick brown fox jumps over the lazy dog.", "I love to eat pizza and ice cream.", "I am going to the park to play with my friends.", "I want to be a doctor when I grow up.", "The sky is blue and the sun is shining.", "Avoid daydreaming about the years to come.","You are the most important person in your whole life.","Always be true to who you are, and ignore what other people have to say about you.","Always be true to who you are, and ignore what other people have to say about you.","Only demonstrate your strength when it's really required."];
    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.querySelector('.wrapper .input-field').focus();
    typingText.addEventListener('click', () => {
        document.querySelector('.wrapper .input-field').focus();
    });
}


//handle user input 
function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if(char[charIndex].innerHTML === typedChar){
            char[charIndex].classList.add('correct');
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerHTML = mistake;
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}


function initTimer() {
    if(timeLeft > 0){
        timeLeft--;
        time.innerHTML = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    time.innerText = timeLeft;
    input.value = '';
}

input.addEventListener('input', initTyping);

btn.addEventListener('click', reset);

loadParagraph();