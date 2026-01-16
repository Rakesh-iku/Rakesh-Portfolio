// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const skillsContainer = document.getElementById('skillsContainer');
const projectsGrid = document.getElementById('projectsGrid');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const statNumbers = document.querySelectorAll('.stat-number');

// Typing Effect Variables
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

// Text to type (only the dynamic part)
const textArray = [
    "Software Development",
    "Frontend Development", 
    "Backend Development",
    "Full Stack Development",
    "Software Testing",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

// Skills Data with SQL and Testing
const skills = [
    { name: "Java", icon: "fab fa-java" },
    { name: "Python", icon: "fab fa-python" },
    { name: "HTML", icon: "fab fa-html5" },
    { name: "CSS", icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "SQL", icon: "fas fa-database" },
    { name: "Testing", icon: "fas fa-vial" }
];


// Initialize when page loads
document.addEventListener('DOMContentLoaded', renderProjects);

// Optional: Re-render if needed
window.renderProjects = renderProjects;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Start typing effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Initialize skills
    renderSkills();
    
    // Initialize projects
    renderProjects();
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Add scroll event listener for active nav link
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initial call to set active nav on page load
    setActiveNavLink();
});

// Typing Effect Functions
function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    const icon = this.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Render Skills
function renderSkills() {
    skillsContainer.innerHTML = '';
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3>${skill.name}</h3>
        `;
        skillsContainer.appendChild(skillCard);
    });
}

// Render Projects
function renderProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <div class="project-header">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
            <div class="project-body">
                <div class="tech-stack">
                    ${techTags}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Counter Animation for Stats
function initCounterAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(statNumber => {
                    const target = parseInt(statNumber.getAttribute('data-count'));
                    animateCounter(statNumber, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + "+";
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + "+";
        }
    }, 30);
}

// Set Active Navigation Link on Scroll
function setActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Form Submission - SIMPLE SOLUTION THAT WORKS
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    console.log('Form data:', { name, email, message });
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    try {
        // Create FormData from the actual form
        const formData = new FormData(contactForm);
        
        // Log what we're sending
        console.log('FormData entries:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Send to Formspree
        const response = await fetch('https://formspree.io/f/xykzrlzb', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Formspree response:', data);
            
            // SUCCESS
            alert(`✅ Thank you ${name}! Your message has been sent successfully.\n\nCheck your email (rakeshravi1960@gmail.com) for the message.`);
            contactForm.reset();
            
        } else {
            // Server error
            const errorText = await response.text();
            console.error('Formspree error:', errorText);
            alert(`❌ Error sending message. Please try again or email me directly.`);
        }
        
    } catch (error) {
        console.error('Network error:', error);
        
        // Fallback: Open email client
        const subject = `Portfolio Message from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        
        window.location.href = `mailto:rakeshravi1960@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        alert('⚠️ Opening email client as fallback. Please send the pre-filled email.');
        
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '';
    }
});

// Test Formspree Connection (Optional - remove in production)
function testFormspreeConnection() {
    console.log('=== Testing Formspree Connection ===');
    
    const testData = new FormData();
    testData.append('name', 'Test User');
    testData.append('email', 'test@example.com');
    testData.append('message', 'This is a test message to verify Formspree is working.');
    testData.append('_subject', 'Test Message');
    
    fetch('https://formspree.io/f/xykzrlzb', {
        method: 'POST',
        body: testData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        console.log('Test response status:', response.status);
        if (response.ok) {
            console.log('✅ Formspree connection working!');
        } else {
            console.log('❌ Formspree connection failed.');
        }
        return response.text();
    })
    .then(data => console.log('Response:', data))
    .catch(error => console.error('Error:', error));
}

// Uncomment to test on page load (remove after testing)
// document.addEventListener('DOMContentLoaded', testFormspreeConnection);

// Debug: Check if form exists and has correct fields
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Form Check ===');
    console.log('Form exists:', !!contactForm);
    console.log('Name field:', document.getElementById('name'));
    console.log('Email field:', document.getElementById('email'));
    console.log('Message field:', document.getElementById('message'));
    
    // Check if form fields have 'name' attributes
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            console.log(`${input.id}: name="${input.name}"`);
        });
    }
});