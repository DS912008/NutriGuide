
        
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.navbar ul');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestionsList');
const searchButton = document.querySelector('.search-bar button');

const pages = [
    { name: 'Home', url: 'dhanu.html' },
    { name: 'About Us', url: 'about.html' },
    { name: 'Login', url: 'drishti.html' },
    { name: 'Weight Management', url: 'weight.html' },
    { name: 'Calorie Counter', url: 'calorie.html' },
  
   
    { name: 'Exercise', url: 'exercise.html' },
    { name: 'Yoga', url: 'exercise.html' },
    { name: 'Recipes', url: 'start.html' },
    { name: 'Ayurveda', url: 'ayurveda.html' },
   
    { name: 'Contact', url: 'contact.html' }
];

function showSuggestions(searchTerm) {
    suggestionsList.innerHTML = '';
    if (searchTerm.length === 0) {
        suggestionsList.style.display = 'none';
        return;
    }

    const filteredPages = pages.filter(page => 
        page.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredPages.length > 0) {
        filteredPages.forEach(page => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${page.url}">${page.name}</a>`;
            suggestionsList.appendChild(li);
        });
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const matchedPage = pages.find(page => 
        page.name.toLowerCase() === searchTerm
    );

    if (matchedPage) {
        window.location.href = matchedPage.url;
    } else {
        showSuggestions(searchTerm);
    }
}

searchInput.addEventListener('input', () => {
    showSuggestions(searchInput.value);
});

searchButton.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.style.display = 'none';
    }
});

// Popup Image Viewer
const images = [
    { src: "intro.png" },
    { src: "intro2.png" },
    { src: "intro3.png" },
    { src: "intro4.png" },
    { src: "intro6.jpg" },
    { src: "intro5.png" },
    { src: "intro8.png" }
 
   
];


let currentImageIndex = 0;
const popupImage = document.querySelector('.popup-image');
const nextButton = document.getElementById('nextButton');
const popupOverlay = document.querySelector('.popup-overlay');

function updateImage() {
    popupImage.src = images[currentImageIndex].src;
    document.querySelector('.image-caption').textContent = images[currentImageIndex].caption;
    
    if (currentImageIndex === images.length - 1) {
        nextButton.textContent = 'Finish';
    } else {
        nextButton.textContent = 'Next';
    }
}

nextButton.addEventListener('click', () => {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        updateImage();
    } else {
        popupOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    updateImage();
    document.body.style.overflow = 'hidden';
});