// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // DOM elements
  const messageInput = document.getElementById('messageInput');
  const sendMessageButton = document.getElementById('sendMessage');
  const messagesContainer = document.getElementById('messages');
  
  // Listen for new messages
  db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
    messagesContainer.innerHTML = '';
    snapshot.forEach(doc => {
      const message = doc.data().text;
      messagesContainer.innerHTML += `<p>${message}</p>`;
    });
  });
  
  // Send message
  sendMessageButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
      db.collection('messages').add({
        text: messageText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      messageInput.value = '';
    }
  });
  