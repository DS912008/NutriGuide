// DOM Elements
const searchInput = document.getElementById('search');
const suggestionsBox = document.getElementById('suggestions');
const searchButton = document.querySelector('.header button:first-of-type');
const micButton = document.querySelector('.header button:last-of-type');

// YouTube API Configuration
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Search functionality with YouTube API
searchInput.addEventListener('input', debounce((e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
        searchVideos(searchTerm);
    } else {
        hideSuggestions();
    }
}, 500));

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search videos using YouTube API
async function searchVideos(query) {
    try {
        const response = await fetch(
            `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.items) {
            const videos = data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                channel: item.snippet.channelTitle,
                thumbnail: item.snippet.thumbnails.default.url
            }));
            showSuggestions(videos);
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        // Fallback to sample data if API fails
        const sampleVideos = [
            { title: 'How to Build a Website', channel: 'Web Dev Tutorials' },
            { title: 'JavaScript Crash Course', channel: 'Code Master' },
            { title: 'CSS Tips and Tricks', channel: 'Design Pro' }
        ];
        showSuggestions(sampleVideos);
    }
}

// Show search suggestions
function showSuggestions(videos) {
    suggestionsBox.innerHTML = '';
    suggestionsBox.classList.add('active');
    
    videos.forEach(video => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion-item';
        suggestion.innerHTML = `
            <img src="${video.thumbnail || ''}" alt="${video.title}" class="suggestion-thumbnail">
            <div class="suggestion-content">
                <div class="suggestion-title">${video.title}</div>
                <div class="suggestion-meta">${video.channel}</div>
            </div>
        `;
        suggestion.addEventListener('click', () => {
            searchInput.value = video.title;
            hideSuggestions();
            // In a real implementation, you would navigate to the video
            window.location.href = `https://www.youtube.com/watch?v=${video.id}`;
        });
        suggestionsBox.appendChild(suggestion);
    });
}

// Hide suggestions
function hideSuggestions() {
    suggestionsBox.classList.remove('active');
}

// Search button click handler
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        searchVideos(searchTerm);
        hideSuggestions();
    }
});

// Microphone button click handler
micButton.addEventListener('click', () => {
    // Voice search implementation would go here
    console.log('Voice search activated');
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        hideSuggestions();
    }
});

// Add hover effects to sidebar items
const sidebarLinks = document.querySelectorAll('.a a');
sidebarLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(10px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// Add active state to current page
function setActivePage() {
    const currentPath = window.location.pathname;
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Initialize
setActivePage();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
    } else {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
    }
});

// Sidebar Toggle
const menuButton = document.querySelector('.left-section i');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
        document.querySelector('.main-content').style.marginLeft = '70px';
    } else {
        document.querySelector('.main-content').style.marginLeft = '240px';
    }
});

// Active Sidebar Item
const sidebarItems = document.querySelectorAll('.sidebar-item');
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Search Functionality (Static)
const searchInput = document.getElementById('search');
const searchButton = document.querySelector('.middle-section button:first-of-type');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        // In a real app, this would perform a search
        console.log('Searching for:', searchTerm);
    }
});

// Microphone Button
const micButton = document.querySelector('.middle-section button:last-of-type');
micButton.addEventListener('click', () => {
    // In a real app, this would activate voice search
    console.log('Voice search activated');
}); 