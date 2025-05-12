const pages = [
    { name: "Home", link: "dhanu.html" },
    { name: "About Us", link: "about.html" },
    { name: "SDG", link: "sdg.html" },
    { name: "Login", link: "drishti.html" },
    { name: "Weight Management", link: "weight.html" },
    { name: "Calorie Counter", link: "calorie.html" },
    { name: "Exercise", link: "exercise.html" },
    { name: "Yoga", link: "exercise.html" },
    {name:"Gym",link:"exercise.html"},
    { name: "Recipes", link: "start.html" },
    { name: "Ayurveda", link: "ayurveda.html" },
    { name: "Contact", link: "contact.html" }

   
   
];

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

// Animate testimonials
const testimonials = document.querySelectorAll('.testimonial');
testimonials.forEach((testimonial, index) => {
    setTimeout(() => {
        testimonial.style.animation = 'fadeInUp 0.5s forwards';
        testimonial.style.opacity = '1';
    }, index * 300);
});

// Counter animation
const counter = document.querySelector('.counter');
let count = 0;
const target = 100000;
const duration = 2000;
const step = target / (duration / 16);

function updateCounter() {
    if (count < target) {
        count += step;
        counter.textContent = Math.min(Math.floor(count), target).toLocaleString() + '+';
        requestAnimationFrame(updateCounter);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
        }
    });
});
observer.observe(counter);

// Chatbot functionality
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const userInput = document.getElementById('userInput');

function initializeChatbot() {
    addMessage("Hello! I'm your NutriGuide assistant. How can I help you today? I can assist with diet recipes, calorie counting, Ayurveda recipes, and exercises.", 'bot');
}

function toggleChatbot() {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        userInput.focus();
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        processUserMessage(message);
        userInput.value = '';
    }
}

function sendQuickMessage(message) {
    addMessage(message, 'user');
    processUserMessage(message);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function processUserMessage(message) {
    setTimeout(() => {
        const lowerMessage = message.toLowerCase();
        let response = '';

        if (/hi|hello|hey|greetings|good morning|gm|gn|good night|ge|good evening|who r u|who are you/.test(lowerMessage)) {
            response = "Hello! I'm your NutriGuide assistant. How can I help you today?";
        }
        else if (/how are you|how r u|how are you doing|how are you doing today/.test(lowerMessage)) {
            response = "I'm just a program, but I'm here to help you! How can I assist you today?";
        }
        else if (/what can you do|what are your capabilities|what can you help with/.test(lowerMessage)) {
            response = "I can assist you with:\n- Diet recipes\n- Calorie counting\n- Ayurveda recipes\n- Exercises\n What would you like help with?";
        }
        else if (/thank you|thanks|appreciate it/.test(lowerMessage)) {
            response = "You're welcome! If you have any more questions, feel free to ask.";
        } else if(/what is nutriguide|what is this|what is this website/.test(lowerMessage)){
            response = "NutriGuide is a platform that provides assistance with diet recipes, calorie counting, Ayurveda recipes, and exercises. How can I help you today?";
        }
        else if (/diet|nutrition|healthy eating/.test(lowerMessage)) {
            response = "You can check the diet section for healthy meal options.";
        }
        else if (/calories|calorie counter/.test(lowerMessage)) {
            response = "You can check the calorie counter section to calculate your daily calorie intake.";
        }
        else if (/ayurveda|ayurvedic recipes/.test(lowerMessage)) {
            response = "You can check the Ayurveda section for Ayurvedic recipes.";
        }
        else if (/exercise|workout|fitness/.test(lowerMessage)) {
            response = "You can check the exercise section for workout routines.";
        }
         else if (/stupid|idiot|dumb|useless/.test(lowerMessage)) {
            response = "Let's keep our conversation positive and productive. How can I assist you today?";
        } else if (/diet|recipe/.test(lowerMessage)) {
            response = "click on weight managment section to find healthy meal options.";
        } else if (/calorie/.test(lowerMessage)) {
            response = "click on calorie counter section to calculate your daily calorie intake.";
        } 
        else if(/aryuveda|ayurvedic/.test(lowerMessage)){
            response = "click on weight management section to find ayurvedic recipes. and then see your own BMI then give answer some questions that will ask in that section then it will ask are on diet or sick click on sick option .Here your aryuvedic section .";
        }
        else if (/ayurveda| where is aryuveda section|aryuvedic|aryuvedic recipes/.test(lowerMessage)) {
            response = "click on weight management section to find ayurvedic recipes. and then see your own BMI then give answer some questions that will ask in that section then it will ask are on diet or sick click on sick option .Here your aryuvedic section ask ";
        } else if (/exercise/.test(lowerMessage)) {
            response = "Click on Exercise section";
          }   else if (/bye|exit|quit/.test(lowerMessage)) {
            response = "Goodbye! If you have more questions, feel free to ask.";
        }
        else if (/aryuveda|ayurvedic/.test(lowerMessage)) {
            response = "Click on the Weight Management section to find Ayurvedic recipes. Then check your own BMI and answer some questions in that section. When asked whether you're on a diet or sick, click on the 'sick' option. Here's your Ayurvedic section.";
        } 
        else if (/ayurveda|where is aryuveda section|aryuvedic recipes/.test(lowerMessage)) {
            response = "Click on the Weight Management section to find Ayurvedic recipes. Then check your own BMI and answer some questions in that section. When asked whether you're on a diet or sick, click on the 'sick' option. Here's your Ayurvedic section.";
        } 
        else if (/exercise/.test(lowerMessage)) {
            response = "Click on the Exercise section.";
        } 
        else if (/bye|exit|quit/.test(lowerMessage)) {
            response = "Goodbye! If you have more questions, feel free to ask.";
        } else if (/aryuvedic|where|how?|means|mean/.test(lowerMessage)) {
            response ="click on the weight management section to find ayurvedic recipes. and then see your own BMI then give answer some questions that will ask in that section then it will ask are on diet or sick click on sick option .Here your aryuvedic section";
        }
        else if (/nutriguide|nutri guide|nutri guide|nutriguide|nutri-guide/.test(lowerMessage)) {
            response = "NutriGuide is a platform that provides assistance with diet recipes, calorie counting, Ayurveda recipes, and exercises. How can I help you today?";
        }else if (/who creates ur website|owner|about ur website creator/.test(lowerMessage)) {
            response = "NutriGuide is created by a team of nutritionists and developers dedicated to promoting healthy living. Dhanu Shree is who is the developer of this website,Gopal who is tester and developer,Grace who is the leader and Drishti is the one who design everything";
        }else if (/who is the owner|who is the creator|who is the developer/.test(lowerMessage)) {      
            response = "NutriGuide is created by a team of nutritionists and developers dedicated to promoting healthy living. Dhanu Shree is who is the developer of this website,Gopal who is tester and developer,Grace who is the leader and Drishti is the one who design everything";
        }
        else if  (/who is the owner|who is the creator|who is the developer/.test(lowerMessage)) {
            response = "NutriGuide is created by a team of nutritionists and developers dedicated to promoting healthy living. Dhanu Shree is who is the developer of this website,Gopal who is tester and developer,Grace who is the leader and Drishti is the one who design everything";
        }
        else if (/who is the owner|who is the creator|who is the developer/.test(lowerMessage)) {
            response = "NutriGuide is created by a team of nutritionists and developers dedicated to promoting healthy living. Dhanu Shree is who is the developer of this website,Gopal who is tester and developer,Grace who is the leader and Drishti is the one who design everything";
        }
        else if (/who is the owner|who is the creator|who is the developer/.test(lowerMessage)) {
            response = "NutriGuide is created by a team of nutritionists and developers dedicated to promoting healthy living. Dhanu Shree is who is the developer of this website,Gopal who is tester and developer,Grace who is the leader and Drishti is the one who design everything";
        }
            else if (/sustainable development goals|sdg|sustainable development goals/.test(lowerMessage)) {
            response = "You can check the SDG section for information on our goals and initiatives.";
        }
        else if (/^s(?:d|g){1,2}$/i.test(lowerMessage)) {
            response = "You mean Sustainable Development Goals? Yes, we follow SDG 2, SDG 3, and SDG 12. If you want to know more about that, you can go through the SDG section.";
        }
        else if(/heloooooooooooooooooooooooooooo|helooooooooooooo|helo|heloo|helooo|heloooo|heloooooo|helooooooooo|helooooooo|heloooooooo|heloooooooooooo|helooooooooooo/.test(lowerMessage)){
            response="do u mean hello.If yes,then hello! I'm your NutriGuide assistant. How can I help you today?";
        }
        else if (/sdg|sustainable development goals/.test(lowerMessage)) {
            response = "You can check the SDG section for information on our goals and initiatives.";
        } else if (/contact|support|help/.test(lowerMessage)) {
            response = "You can check the contact page for more details.";
        } else if (/feedback|suggestion/.test(lowerMessage)) {
            response = "We appreciate your feedback! Please share your suggestions.";
        } else if (/complaint|issue/.test(lowerMessage)) {
            response = "I'm sorry to hear that. Please provide details about the issue.";
        } else if (/appointment|schedule/.test(lowerMessage)) {
            response = "You can check the contact page for appointment scheduling.";
        } else if (/location|address/.test(lowerMessage)) {
            response = "You can check the contact page for our location and address.";
        } else if (/hours|timing/.test(lowerMessage)) {
            response = "You can check the contact page for our hours of operation.";
        }
        else if (/help|assist|support/.test(lowerMessage)) {

            response = "I can help you with:\n- Diet\n- Calories\n- Ayurveda\n- Exercises\n What would you like help with?";
        }else if (/thank|thanks|appreciate/.test(lowerMessage)) {
            response = "You're welcome! If you have any more questions, feel free to ask.";
        }else if (/joke|funny/.test(lowerMessage)) {    
            response = "Why did the scarecrow win an award? Because he was outstanding in his field!";
        }
        else if (/weather|temperature/.test(lowerMessage)) {
            response = "I can't provide weather updates, but you can check your local weather app!";
        } else if (/news|latest/.test(lowerMessage)) {
            response = "I can't provide news updates, but you can check your favorite news website!";
        } else if (/music|song/.test(lowerMessage)) {
            response = "I can't play music, but I can suggest some great playlists!";
        } else if (/movie|film/.test(lowerMessage)) {
            response = "I can't recommend movies, but you can check popular streaming platforms!";
        } else if (/book|read/.test(lowerMessage)) {
            response = "I can't recommend books, but you can check popular book review sites!";
        }
        else if (/food|meal/.test(lowerMessage)) {
            response = "you can check on weight managemnet section for healthy meal options,if not then view contact page for more details";
        }
        else if (/exercise|workout/.test(lowerMessage)) {
            response = "You can check the exercise section for workout routines, if not then view contact page for more details";
        }
        else if (/nutrition|healthy/.test(lowerMessage)) {
            response = "You can check the diet section for healthy meal options, if not then view contact page for more details";
        }
        else if (/bmi|body mass index/.test(lowerMessage)) {
            response = "You can check the BMI calculator in the calorie counter section.";
        }
        else if (/sick|illness/.test(lowerMessage)) {
            response = "You can check the ayurvedic recipes in the weight management section.";
        }
        else if (/exercise|workout/.test(lowerMessage)) {
            response = "You can check the exercise section for workout routines.";
        }
        else if (/calories|calorie/.test(lowerMessage)) {
            response = "You can check the calorie counter section to calculate your daily calorie intake.";
        }
        else if (/weight|lose|gain/.test(lowerMessage)) {
            response = "You can check the weight management section for tips on weight loss or gain.";
        }
        else if (/recipe|cooking/.test(lowerMessage)) {
            response = "You can check the diet section for healthy recipes.";
        }
        else if (/nutrients|vitamins/.test(lowerMessage)) {
            response = "You can check the diet section for information on nutrients and vitamins.";
        }
        else if (/exercise|fitness/.test(lowerMessage)) {
            response = "You can check the exercise section for fitness tips and routines.";
        }
        else if (/healthy|wellness/.test(lowerMessage)) {
            response = "You can check the diet section for healthy meal options.";
        }
        else if (/sleep|rest/.test(lowerMessage)) {
            response = "You can check the diet section for tips on improving sleep quality.";
        }
        else if (/stress|anxiety/.test(lowerMessage)) {
            response = "You can check the diet section for tips on managing stress and anxiety.";
        }
        else if (/meditation|mindfulness/.test(lowerMessage)) {
            response = "You can check the exercise section for meditation and mindfulness tips.";
        }
        else if (/yoga|stretching/.test(lowerMessage)) {
            response = "You can check the exercise section for yoga and stretching routines.";
        }
        else if (/exercise|workout/.test(lowerMessage)) {
            response = "You can check the exercise section for workout routines.";
        }
        else if (/healthy|wellness/.test(lowerMessage)) {
            response = "You can check the diet section for healthy meal options.";
        }
        else if (/sleep|rest/.test(lowerMessage)) {
            response = "You can check the diet section for tips on improving sleep quality.";
        }
        else if (/stress|anxiety/.test(lowerMessage)) {
            response = "You can check the diet section for tips on managing stress and anxiety.";
        }
        else if (/meditation|mindfulness/.test(lowerMessage)) {
            response = "You can check the exercise section for meditation and mindfulness tips.";
        }
        else if (/yoga|stretching|ntg/.test(lowerMessage)) {    
            response = "You can check the exercise section for yoga and stretching routines.";
        }else if (/SDG|SdG|SDG|sdg|sdG|SdG/.test(lowerMessage)) {
            response = "You can check the SDG section for information on our goals and initiatives.";
        }else if (/contact|support|help/.test(lowerMessage)) {
            response = "You can check the contact page for more details.";
        }
        else if (/feedback|suggestion/.test(lowerMessage)) {
            response = "We appreciate your feedback! Please share your suggestions.";
        } else if (/complaint|issue/.test(lowerMessage)) {
            response = "I'm sorry to hear that. Please provide details about the issue.";
        } else if (/appointment|schedule/.test(lowerMessage)) {
            response = "You can check the contact page for appointment scheduling.";
        } else if (/location|address/.test(lowerMessage)) {
            response = "You can check the contact page for our location and address.";
        } else if (/hours|timing/.test(lowerMessage)) {
            response = "You can check the contact page for our hours of operation.";
        }
        else{
            response ="I'm sorry, I didn't understand that. Can you please rephrase Or u can contact us for more details,we will help you out";
          
        }

        addMessage(response, 'bot');
        speak(response);
    }, 1000);
}

function startVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            sendMessage();
        };
        recognition.onerror = () => {
            addMessage("Voice recognition error. Please try again.", 'bot');
        };
        recognition.start();
    } else {
        addMessage("Your browser doesn't support voice recognition.", 'bot');
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.name.includes('Female')) || voices[0];
        utterance.voice = selectedVoice;
        speechSynthesis.speak(utterance);
    }
}

document.addEventListener('DOMContentLoaded', initializeChatbot);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
