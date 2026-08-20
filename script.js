// 1. Speech Recognition (Speech-to-Text)
function startVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("🌸 Voice input is not supported on this browser. Try Google Chrome or Microsoft Edge!");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  const chatInput = document.getElementById('chatInput');
  chatInput.placeholder = "Listening to you... 🌸🎤";

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    chatInput.placeholder = "Message Amanda...";
    handleChatSubmit(); // Automatically sends the spoken prompt
  };

  recognition.onerror = function() {
    chatInput.placeholder = "Message Amanda...";
    alert("🌸 Couldn't capture audio. Please try speaking again!");
  };
}

// 2. Text-to-Speech (Amanda talks back)
function speakResponse(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2; // Slightly higher, friendly pitch
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}
setTimeout(() => {
  const replyText = `I've noted that for "${message}". You can also use the sidebar tools above to generate full drafts!`;
  
  const aiMsg = document.createElement('div');
  aiMsg.className = 'chat-bubble ai';
  aiMsg.innerText = `🌸 Amanda: ${replyText}`;
  feed.appendChild(aiMsg);
  feed.scrollTop = feed.scrollHeight;

  // Amanda speaks the response out loud
  speakResponse(replyText);
}, 350);
