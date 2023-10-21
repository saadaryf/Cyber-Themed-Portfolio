function fetchData() {
  console.log("being called");
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Public CORS proxy
  const apiUrl = 'https://official-joke-api.appspot.com/random_joke';

  fetch(proxyUrl + apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
       const messageDiv = document.createElement('div');
       messageDiv.classList.add('yellow-msg');
       messageDiv.innerHTML = `Bot: ${data.setup}<br>${data.punchline}`;
       chatBox.appendChild(messageDiv);
    })
    .catch(error => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('bot-message');
      messageDiv.innerHTML = `Come again Later for more Jokes`;
      chatBox.appendChild(messageDiv);
      console.error('Error fetching result:', error);
    });
}

const getDataButton = document.getElementById('getDataButton');
getDataButton.addEventListener('click', fetchData);
