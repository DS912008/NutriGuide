const pages = [
  { name: "Home", link: "dhanu.html" },
  { name: "About", link: "about.html" },
  { name: "SDG", link: "sdg.html" },
  { name: "Login", link: "drishti.html" },
  { name: "Contact", link: "contact.html" },
  { name: "Recipes", link: "overweight.html" },
      { name: "OverweightRecipes", link: "overweight.html" },
      { name: "underRecipes", link: "underrweight.html" },
  { name: "Ayurveda", link: "aryuveda.html" },
     { name: "Cold", link: "cold.html" },
     { name: "Fever", link: "fever.html" },

     { name: "Tea", link: "Tea.html" },
     { name: "Immunity", link: "Immunity.html" },
    
  { name: "Exercise", link: "Overweightyoga.html" },
     { name: "OverweightExercise", link: "overweightyoga.html" },
     { name: "UnderExercise", link: "underweightyoga.html" },
     
];

function showSuggestions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const suggestionsList = document.getElementById("suggestionsList");
  suggestionsList.innerHTML = "";

  if (!input) {
    suggestionsList.style.display = "none";
    return;
  }

  const filtered = pages.filter(p => p.name.toLowerCase().includes(input));
  if (!filtered.length) return suggestionsList.style.display = "none";

  suggestionsList.style.display = "block";
  filtered.forEach(page => {
    const li = document.createElement("li");
    li.textContent = page.name;
    li.onclick = () => window.location.href = page.link;
    suggestionsList.appendChild(li);
  });
}

function handleSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const page = pages.find(p => p.name.toLowerCase() === input);
  if (page) window.location.href = page.link;
  else showSuggestions();
}

document.getElementById("searchInput").addEventListener("input", showSuggestions);
document.getElementById("searchInput").addEventListener("keypress", e => {
  if (e.key === "Enter") handleSearch();
});

document.addEventListener("click", e => {
  const list = document.getElementById("suggestionsList");
  if (!document.getElementById("searchInput").contains(e.target) &&
      !list.contains(e.target)) {
    list.style.display = "none";
  }
});

// Chatbot
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotMessages = document.getElementById("chatbotMessages");
const userInput = document.getElementById("userInput");

function initializeChatbot() {
  addMessage("Hello! 👋 I'm your NutriGuide assistant. Ask me anything related to health, diet, Ayurveda, or workouts!", "bot");
}

function toggleChatbot() {
  chatbotWindow.classList.toggle("active");
  if (chatbotWindow.classList.contains("active")) userInput.focus();
}

function sendMessage() {
  const msg = userInput.value.trim();
  if (msg) {
    addMessage(msg, "user");
    processUserMessage(msg);
    userInput.value = "";
  }
}

function sendQuickMessage(msg) {
  addMessage(msg, "user");
  processUserMessage(msg);
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}-message`;
  div.textContent = text;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  }
}

function startVoiceInput() {
  if ('webkitSpeechRecognition' in window) {
    const recog = new webkitSpeechRecognition();
    recog.lang = 'en-US';
    recog.onresult = e => {
      userInput.value = e.results[0][0].transcript;
      sendMessage();
    };
    recog.start();
  } else {
    addMessage("Voice recognition not supported.", "bot");
  }
}

function processUserMessage(message) {
  const msg = message.toLowerCase();
  let res = "";

  if (/^(hi|hello|hey|greetings)/.test(msg)) {
    res = "Hey! 👋 I'm NutriGuide Assistant. How can I help you today?";
  } else if (/bye|exit|goodbye/.test(msg)) {
    res = "Goodbye! Take care and stay healthy!";
  } else if (/stupid|idiot|dumb|useless/.test(msg)) {
    res = "I'm here to help you 😊 Let's keep our conversation positive!";
  } else if (msg.includes("contact")) {
    res = "You can reach us through the Contact page. We'll get back to you soon!";
  } else if (msg.includes("login")) {
    res = "To login, click on the Login tab from the navbar.";
  } else if (msg.includes("sdg")) {
    res = "We support SDG 2, 3, and 12. You can read more in the SDG section.";
  } else if (msg.includes("recipes")) {
    res = "Visit the Weight Management section. First calculate your BMI. Then based on it, you'll get customized meal plans. If you're marked sick, you'll get Ayurvedic recipes.";
  } else if (msg.includes("ayurveda") || msg.includes("ayurvedic")) {
    res = "To access Ayurvedic recipes:\n1. Go to Weight Management.\n2. Calculate your BMI.\n3. If sick, you'll get Ayurvedic suggestions.\nYou can also access them directly from the homepage (next to Weight Management section).";
  } else if (msg.includes("exercise") || msg.includes("yoga")) {
    res = "Visit the Exercise section. You'll receive yoga poses based on your BMI — whether underweight or overweight.";
  } else {
    res = "I’m here to help! Try asking about BMI, diet plans, yoga, Ayurveda, or how to get started. You can also contact us for assistance.";
  }

  addMessage(res, "bot");
  speak(res);
}

document.addEventListener("DOMContentLoaded", initializeChatbot);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
