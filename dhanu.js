const pages = [
  { name: "Home", link: "dhanu.html" },
  { name: "About", link: "about.html" },
  { name: "SDG", link: "sdg.html" },
  { name: "Login", link: "drishti.html" },
  { name: "Contact", link: "contact.html" },
  { name: "Recipes", link: "overweight.html" },
  { name: "OverweightRecipes", link: "overweight.html" },
  { name: "UnderRecipes", link: "underrweight.html" },
  { name: "Ayurveda", link: "aryuveda.html" },
  { name: "Cold", link: "cold.html" },
  { name: "Fever", link: "fever.html" },
  { name: "Tea", link: "tea.html" },
  { name: "Immunity", link: "immunity.html" },
  { name: "Exercise", link: "Overweightyoga.html" },
  { name: "OverweightExercise", link: "overweightyoga.html" },
  { name: "UnderExercise", link: "underweightyoga.html" }
];

// Search functionality (unchanged)
function showSuggestions() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const suggestionsList = document.getElementById('suggestionsList');
  suggestionsList.innerHTML = '';

  if (!input) {
    suggestionsList.style.display = 'none';
    return;
  }

  const filteredPages = pages.filter(page => page.name.toLowerCase().includes(input));

  if (!filteredPages.length) {
    suggestionsList.style.display = 'none';
    return;
  }

  suggestionsList.style.display = 'block';
  filteredPages.forEach(page => {
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = page.name;
    suggestionItem.onclick = () => window.location.href = page.link;
    suggestionsList.appendChild(suggestionItem);
  });
}

function handleSearch() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const matchedPage = pages.find(page => page.name.toLowerCase() === input);
  if (matchedPage) {
    window.location.href = matchedPage.link;
  } else {
    showSuggestions();
  }
}

document.getElementById('searchInput').addEventListener('input', showSuggestions);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

document.addEventListener('click', (e) => {
  const suggestionsList = document.getElementById('suggestionsList');
  const searchInput = document.getElementById('searchInput');
  if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
    suggestionsList.style.display = 'none';
  }
});
// Chatbot functionality
let chatbotInitialized = false;
let voiceEnabled = true;
let isListening = false;
let recognition;
let currentUtterance = null;

function initializeChatbot() {
  if (chatbotInitialized) return;
  chatbotInitialized = true;
  
  setTimeout(() => {
    addMessage({
      text: "🌸 Welcome to NutriGuide! I'm your nutrition companion. How may I assist you today?",
      sender: 'bot',
      buttons: [
        { text: "Healthy Recipes", action: "healthy recipes" },
        { text: "Fitness Tips", action: "fitness tips" },
        { text: "Wellness Advice", action: "wellness advice" }
      ]
    });
  }, 500);
}

function toggleChatbot() {
  const chatbotWindow = document.getElementById('chatbotWindow');
  chatbotWindow.classList.toggle('hidden');
  
  if (chatbotWindow.classList.contains('hidden')) {
    // Stop any ongoing speech when closing
    stopSpeech();
    stopVoiceInput();
  } else {
    initializeChatbot();
    userInput.focus();
  }
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  const voiceToggle = document.getElementById('voiceToggle');
  if (voiceEnabled) {
    voiceToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    voiceToggle.title = "Voice enabled";
    addMessage({ text: "🔊 Voice responses enabled", sender: 'bot' });
  } else {
    voiceToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    voiceToggle.title = "Voice disabled";
    stopSpeech();
    addMessage({ text: "🔇 Voice responses disabled", sender: 'bot' });
  }
}

function sendMessage() {
  const message = userInput.value.trim();
  if (message) {
    addMessage({ text: message, sender: 'user' });
    processUserMessage(message);
    userInput.value = '';
  }
}

function addMessage({ text, sender, buttons = [] }) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message chat-enter rounded-lg p-3 max-w-[80%] ${
    sender === 'user' 
      ? 'bg-green-100 text-green-900 ml-auto' 
      : 'bg-white text-gray-800 shadow-sm mr-auto'
  }`;
  messageDiv.textContent = text;
  
  if (buttons.length > 0) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex flex-wrap gap-2 mt-2';
    
    buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.className = 'px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-full text-xs transition';
      btn.textContent = button.text;
      btn.onclick = () => sendQuickMessage(button.text);
      buttonContainer.appendChild(btn);
    });
    
    messageDiv.appendChild(buttonContainer);
  }
  
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function processUserMessage(message) {
  const msg = message.toLowerCase();
  let response = "";
  let buttons = [];

  // Handle greetings
  if (/^(hi|hello|hey|greetings|namaste|hola)/.test(msg)) {
    const greetings = [
      "🌸 Hello lovely! How can I brighten your day with nutrition wisdom?",
      "🌿 Greetings wellness seeker! What shall we explore today?",
      "💖 Hi there! Ready to nourish your body and soul?",
      "🌞 Wonderful to see you! How can I assist with your health goals?"
    ];
    response = greetings[Math.floor(Math.random() * greetings.length)];
    buttons = [
      { text: "Meal Ideas", action: "meal ideas" },
      { text: "Health Tips", action: "health tips" },
      { text: "Recipes", action: "recipes" }
    ];
  } 
  // Handle praise/compliments
  else if (/(thank|thanks|appreciate|awesome|great|good|wonderful|amazing|love|like).*(you|bot|assistant)/.test(msg)) {
    const praises = [
      "💖 Your kind words warm my circuits! I'm here to support your wellness journey.",
      "🌸 Thank you! Helping you nourish yourself brings me joy.",
      "🌿 I appreciate your gratitude! Let's continue this journey to better health together.",
      "🌟 You're most welcome! It's my pleasure to assist you in your nutrition goals."
    ];
    response = praises[Math.floor(Math.random() * praises.length)];
  }
  // Handle insults/negative
  else if (/(stupid|idiot|dumb|useless|hate|suck|annoying|bad)/.test(msg)) {
    const gentleResponses = [
      "🍃 I'm here to help in any way I can. Let me know how I can better serve you.",
      "💧 I sense frustration - how can I adjust to meet your needs?",
      "🌸 Even flowers face storms but keep blooming. How may I assist you differently?",
      "🌱 Let's reset - what nutrition question can I help with today?"
    ];
    response = gentleResponses[Math.floor(Math.random() * gentleResponses.length)];
  }
  else if (/bye|exit|see you|goodbye/.test(msg)) {
    response = "🌻 Until next time! Remember: small, consistent healthy choices create big changes.";
  }
  else if (/contact/.test(msg)) {
    response = "📞 Our care team is available 9am-5pm. You can also email support@nutriguide.ai for help.";
  }
  else if (/login/.test(msg)) {
    response = "🔐 Visit our login page to access your personalized dashboard with meal plans and progress tracking.";
  }
  else if (/recipe|recipes|diet/.test(msg)) {
    response = "🍽 I'd love to suggest recipes! Are you looking for:\n• Weight management\n• Immune support\n• Quick meals\n• Special diets?";
    buttons = [
      { text: "Weight Loss", action: "weight loss recipes" },
      { text: "Immunity", action: "immunity recipes" },
      { text: "Quick Meals", action: "quick meals" }
    ];
  }
  else if (/exercise|workout|yoga/.test(msg)) {
    response = "🧘‍♀️ Movement nourishes the body! I can suggest:\n• Gentle yoga flows\n• Home workouts\n• Fitness tips\nWhat interests you?";
    buttons = [
      { text: "Beginner Yoga", action: "beginner yoga" },
      { text: "No-Equipment", action: "no equipment workouts" },
      { text: "Energy Boost", action: "energy boosting exercises" }
    ];
  }
  else if (/ayurveda|ayurvedic/.test(msg)) {
    response = "🌿 Ayurveda offers beautiful harmony! I can guide you on:\n• Dosha-balancing foods\n• Seasonal eating\n• Natural remedies\nWhat calls to you?";
    buttons = [
      { text: "Dosha Quiz", action: "dosha quiz" },
      { text: "Herbal Teas", action: "ayurvedic teas" },
      { text: "Digestion", action: "ayurveda digestion" }
    ];
  }
  else {
    response = "🌱 I'm always learning! Try asking about:\n• Meal planning\n• Superfoods\n• Healthy swaps\n• Nutrition myths\nWhat's on your mind?";
    buttons = [
      { text: "Meal Planning", action: "meal planning" },
      { text: "Superfoods", action: "superfoods" },
      { text: "Healthy Snacks", action: "healthy snacks" }
    ];
  }

  setTimeout(() => {
    addMessage({ text: response, sender: 'bot', buttons });
    if (voiceEnabled) speak(response);
  }, 600);
}

function speak(text) {
  if ('speechSynthesis' in window) {
    stopSpeech(); // Stop any ongoing speech
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Soothing voice settings
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1;
    currentUtterance.volume = 0.8;
    
    // Try to find a pleasant voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = voices.filter(v => 
      v.name.includes('Google') || 
      v.name.includes('Samantha') || 
      v.name.includes('Zira') ||
      v.lang.includes('en-US')
    );
    
    if (preferredVoices.length > 0) {
      currentUtterance.voice = preferredVoices[0];
    }
    
    currentUtterance.onend = () => {
      currentUtterance = null;
    };
    
    window.speechSynthesis.speak(currentUtterance);
  }
}

// Rest of your existing functions (startVoiceInput, stopVoiceInput) remain the same
// ...

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const chatbotMessages = document.getElementById('chatbotMessages');
  const userInput = document.getElementById('userInput');
  
  // Set up event listeners
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Load voices for speech synthesis
  if ('speechSynthesis' in window) {
    // Some browsers need this to populate voices
    window.speechSynthesis.getVoices();
  }
  
  // Initialize chatbot if window is visible
  if (!document.getElementById('chatbotWindow').classList.contains('hidden')) {
    initializeChatbot();
  }
});
