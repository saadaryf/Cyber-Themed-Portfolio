// if want ghost to follow add here


// -------

const ghostElement = document.querySelector('.ghost');


const chatPopup = document.querySelector('.chat-popup');// opening chat popup

function toggleBtns() {
  if (chatPopup.classList.contains('open')) {
    chatPopup.classList.remove('open');
  } else {
    chatPopup.classList.add('open');
  }
}




let isGhostVisible = true;              // hiding ghost
const ghostBtn = document.getElementById('toggle-ghost-btn');
function toggleGhost() {
  // Toggle the visibility of the ghost
  isGhostVisible = !isGhostVisible;
  if (isGhostVisible) {
    ghostElement.classList.remove('hidden');
    ghostBtn.textContent = 'Vanish-Bot';
  } else {
    ghostElement.classList.add('hidden');
    chatPopup.classList.remove('open');
    ghostBtn.textContent = 'Summon-Bot';
  }
};


function sendAbout() {
  toggleInterval(false);
  togglePopupInfo('ab');
}
function sendBye() {
  toggleInterval(false);
  togglePopupInfo('bye');
}
// function sendJoke() {
//   toggleInterval(false);
//   togglePopupInfo('joke');
// }
// function sendKnowledge() {
//   toggleInterval(false);
//   togglePopupInfo('kn');
// }

// fetch('text/responses.txt')
//   .then(response => response.text())
//   .then(TEXT => {
//     const responses = {};

//     const lines = TEXT.split('\n');
//     lines.forEach(line => {
//       const [key, value] = line.split(':');
//       if (key && value) {
//         responses[key.trim()] = value.trim();
//       }
//     })
//   });
// function handleFileContent(content) {
//   console.log(responses);
// }

let knowledge = fetch('text/knowledge.txt')
  .then(response => response.text())
  .then(TEXT => {
    knowledge = TEXT.split('\n');
  });

let jokes = fetch('text/jokes.txt')
  .then(response => response.text())
  .then(TEXT => {
    jokes = TEXT.split('\n');
  });

let expressions = fetch('text/expressions.txt')
  .then(response => response.text())
  .then(TEXT => {
    // Store the file content in the variable
    expressions = TEXT.split('\n');
    // Call a function to handle further processing
    //  handleFileContent(expressions);
  });



//  function handleFileContent(content) {
//    console.log(expressions);
//  }


const bye = [
  "Farewell",
  "Goodbye",
  "See Soon",
  "Come Back Later"
];
const about = [
  "Name: Nex\n Developer: saadaryf\n-Under Development-\n [for more info open chat]"
]

const mouthElement = document.querySelector('.mouth');

let currentIndex = -1;  // Initialize currentIndex

function togglePopupText() {
  const popupText = document.getElementById('popup-text');
  const expressionElement = document.getElementById('expression');

  popupText.classList.toggle('hidden');  // Hide the popup
  mouthElement.classList.toggle('talking');
  currentIndex = (currentIndex + 1) % expressions.length;
  expressionElement.textContent = expressions[currentIndex];

}
function togglePopupInfo(data) {
  console.log("data received");
  const popupText = document.getElementById('popup-text');
  const expressionElement = document.getElementById('expression');

  popupText.classList.toggle('hidden');  // Hide the popup
  mouthElement.classList.toggle('talking');
  if (data == 'bye') {
    currentIndex = (currentIndex + 1) % bye.length;
    expressionElement.textContent = bye[currentIndex];
    setTimeout(() => {
      toggleInterval(true);
      toggleGhost();      // Stop the interval
    }, 1000);
  } else if (data == 'ab') {
    console.log("and checked toooooo");
    expressionElement.textContent = about[0];
    setTimeout(() => {
      toggleInterval(true); // Stop the interval
    }, 8000);
  }
  else {
    console.log("NO DATA");
  }
  console.log("AND PROCESSED");

}


// function startInterval(istextnull) {
//   const interval = istextnull ? 2000 : 8000;
//   console.log("interval: " + interval);
//   setTimeout(togglePopupText, interval);
// }
let isIntervalActive = true;
let interval;
let currentData = null;

function startInterval(initialValue) {
  isIntervalActive = initialValue;

  const intervalDuration = 3000;

  // Clear the existing interval if it's active
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    if (isIntervalActive === true) {
      console.log('Interval is active.');
      togglePopupText();
    } else {
      console.log('Interval is not active.');
      console.log('Cleared');
    }
  }, intervalDuration);
}

function toggleInterval(value) {
  isIntervalActive = value;

  if (isIntervalActive) {
    console.log('Interval is now active.');
  } else {
    console.log('Interval is now inactive.');
  }
}

// Start the interval
startInterval(true);

// function sendAbout() {
//   toggleInterval(false);
//   togglePopupInfo('ab');
// }






document.addEventListener('DOMContentLoaded', function () {                // make bot look down
  const chatPopup = document.querySelector('#chat-popup');
  const speedCaptureInner = document.querySelector('#speedcapture .inner');

  chatPopup.addEventListener('mouseover', function () {
    speedCaptureInner.classList.add('hovered');
  });

  chatPopup.addEventListener('mouseout', function () {
    speedCaptureInner.classList.remove('hovered');
  });
});

document.addEventListener('DOMContentLoaded', function () {                // make bot look up
  const input = document.querySelector('#user-input');
  const speedCaptureInner = document.querySelector('#speedcapture .inner');

  input.addEventListener('focus', function () {
    speedCaptureInner.classList.add('up');
  });

  input.addEventListener('blur', function () {
    speedCaptureInner.classList.remove('up');
  });
});




const chatBox = document.getElementById('chat');                    //chat with bot
const userInput = document.getElementById('user-input');

function addMessage(message, isUser) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.innerText = message;
  chatBox.appendChild(messageDiv);
  scrollChatToBottom();
}

function handleUserInput(usermsg) {
  //  if (event.key === 'Enter') {
  const userMessage = usermsg;
  addMessage(`You: ${userMessage}`, true);
  userInput.value = ''; // Clear the input
  // Simulate bot response (you would replace this with your logic)
  const botResponse = generateBotResponse(userMessage);
  addMessage(`Bot: ${botResponse}`, false);
  //}
}

let responses =

  fetch('text/responses.txt')                               // fetch response.txt
    .then(response => response.text())
    .then(TEXT => {
      const lines = TEXT.split('\n');
      lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          responses[key.trim()] = value.trim();
          console.log(responses);
        }
      });
    });

function generateBotResponse(userMessage) {                             // bot response
  const lowerCaseUserMessage = userMessage.toLowerCase();

  if (lowerCaseUserMessage === '') {
    return "Please say something! I'm here to for you.";
  }

  const userWords = lowerCaseUserMessage.split(' ');

  let maxMatches = 0;
  let bestResponse = '';

  for (const line in responses) {
    const keywords = line.split(',').map(word => word.trim());
    const matches = userWords.filter(word => keywords.includes(word)).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      bestResponse = responses[line].trim();
    }
  }

  return bestResponse !== '' ? bestResponse : generateRandomAnswer();
}





const inputText = "Oops, Mistake, Error I'm still working on machine learning! Could please use for now? operating, malfunctioning, in progress";
const words = inputText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(' ');

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function generateRandomAnswer() {
  const word1 = getRandomWord();
  const word2 = getRandomWord();
  const word4 = getRandomWord();
  const word6 = getRandomWord();
  const word7 = getRandomWord();
  return `⚠ ${word1} ${word2} learning ${word4} ${word6} use Simple Pharase ${word7}`;
}



const on = document.querySelector('.chat-box')

function toggleChat() {
  on.classList.toggle('on');
}
function closeChat() {               // close chats
  if (!(ghostElement.classList.contains('hidden'))) {
    on.classList.remove('on');
  }
  else {
    on.classList.add('on');
  }
}
function sendMessage() {                    //send message
  const message = document.getElementById('user-input').value;
  handleUserInput(message);
}
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    // Trigger the sendMessage function on 'Enter' key press
    sendMessage();
  }
}

function clearChat() {                                //clear chat
  // Clear the chat content
  document.getElementById('chat').innerHTML = '';
}

function scrollChatToBottom() {                       // scroll chat to top
  const chat = document.getElementById('chat');
  chat.scrollTop = chat.scrollHeight;
}


let fontSize = 16;  // Initial font size                  // zoom in and out
function zoomIn() {
  fontSize += 2;
  updateFontSize();
}
function zoomOut() {
  fontSize = Math.max(8, fontSize - 2);  // Limit minimum font size to 8
  updateFontSize();
}
function updateFontSize() {
  const chat = document.getElementById('chat');
  chat.style.fontSize = `${fontSize}px`;
}