const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');
const typingIndicator = document.getElementById('typing-indicator');
const quickReplies = document.getElementById('quick-replies');
const responses = [
  {
    keywords: ["what is stimulus", "about stimulus", "stimulus.org.in", "who are you", "what are you about", "explain stimulus"],
    reply: "Stimulus.org.in is a platform that offers business consulting, professional guidance, and project support."
  },
  {
    keywords: ["register", "signup", "sign up", "join"],
    reply: ` As of now we do not have a exact way to register but You can check our services page by visiting our <a href="https://stimulus.org.in/services" target="_blank">Services Page</a>.`
  },
  {
    keywords: ["contact", "email", "phone", "reach you"],
    reply: `You can reach us at <a"founder@stimulus.org.in">founder@stimulus.org.in</a>`
  },
  {
    keywords: ["services", "help", "offer", "consulting", "what do you provide", "what help do you give"],
    reply: "We offer services in Business Consulting, Job Recruitment, and Business Advisory."
  },
  {
    keywords: ["location", "address", "where are you"],
    reply: "Our main headquarters is located at 601, Dreams Avenue, University Road Kolhapur 416004, Maharashtra. we also have a new location coming soon"
  },
  {
    keywords: ["events", "seminars", "workshops"],
    reply: "to see if there are any events active you will need to contact us for details <a href='https://stimulus.org.in/contact' target='_blank'>contacts Page</a>"
  },
  {
    keywords: ["volunteer", "volunteering", "opportunities"],
    reply: "to see if there are any opportunities to volunteer you will need to contact us for details <a href='https://stimulus.org.in/contact' target='_blank'>contacts Page</a>"
  },
  {
    keywords: ["careers", "jobs", "hiring", "work with you"],
    reply: "Interested in working with us? you will need to contact us for details <a href='https://stimulus.org.in/contact' target='_blank'>contacts Page</a>"
  },
  {
    keywords: ["pricing", "cost", "fees"],
    reply: "Our pricing depends on the service with a Free initial consultation. Visit our <a href='https://stimulus.org.in/contact' target='_blank'>contacts Page</a> for details."
  },
  {
    keywords: ["faq", "questions", "common queries"],
    reply: "You can find answers to common queries on our <a href='https://stimulus.org.in/about' target='_blank'>About Page</a>."
  }
];

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  displayMessage(text, 'user');
  input.value = '';
  input.focus();

  if (isQuestion(text)) {
    showTyping();
    setTimeout(() => {
      getBotResponse(text);
    }, 1200); 
  } else {
    getBotResponse(text);
  }
}

function displayMessage(message, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.innerHTML = message;
  chatHistory.appendChild(msgDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showTyping() {
  typingIndicator.classList.remove('hidden');
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function hideTyping() {
  typingIndicator.classList.add('hidden');
}

function getBotResponse(userText) {
  hideTyping();
  const text = userText.toLowerCase();
  
  let foundResponse = null;
  
  for (let r of responses) {
    if (r.keywords.some(keyword => text.includes(keyword))) {
      foundResponse = r.reply;
      break;
    }
  }
  
  if (!foundResponse) {
    foundResponse = "Sorry, I don't understand that yet. You could try asking about <b>registration</b>, <b>services</b>, or <b>contact info</b>.";
  }
  
  displayMessage(foundResponse, 'bot');
  setTimeout(updateQuickReplies, 300); 
}

function updateQuickReplies() {
  quickReplies.innerHTML = '';
  const suggestions = ["Register", "Contact", "Services", "Events", "Careers", "FAQ"];
  suggestions.forEach(s => {
    const btn = document.createElement('button');
    btn.classList.add('quick-btn');
    btn.innerText = s;
    btn.setAttribute('aria-label', `Quick reply: ${s}`);
    btn.addEventListener('click', () => {
      input.value = s;
      sendMessage();
    });
    quickReplies.appendChild(btn);
  });
}

function isQuestion(text) {
  const questionWords = ["what", "how", "when", "where", "why", "can", "does", "is", "are", "do", "should"];
  const lower = text.toLowerCase();
  return lower.endsWith("?") || questionWords.some(word => lower.startsWith(word));
}