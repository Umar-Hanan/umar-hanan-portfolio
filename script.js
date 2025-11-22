// ==================== SECURITY & INITIALIZATION ==================== 
'use strict';

// Prevent console access in production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
}

// ==================== NAVIGATION ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Function to update active nav link
    function updateActiveNav() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update on page load
    updateActiveNav();

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// ==================== DOWNLOAD CV ====================
function downloadCV() {
    // Create a simple CV file or link to existing one
    const cvLink = document.createElement('a');
    cvLink.href = 'cv.pdf'; // Replace with your CV file path
    cvLink.download = 'Umar_Hanan_CV.pdf';
    document.body.appendChild(cvLink);
    cvLink.click();
    document.body.removeChild(cvLink);
}




// ==================== DOWNLOAD CERTIFICATE ====================
function downloadCertificate() {
    // Replace with the actual path to your certificate file
    const certUrl = 'certificate.pdf';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = certUrl;
    link.download = 'Umar_Hanan_Graphics_Design_Certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Add a notification or feedback
    alert('Certificate download started! If it doesn\'t start automatically, please check your downloads folder.');
}

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ANIMATIONS ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and other elements
document.querySelectorAll('.skill-card, .tool-card, .gallery-item, .project-card').forEach(el => {
    observer.observe(el);
});


// ==================== MOBILE RESPONSIVE MENU ====================
function handleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
}

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu();

// ==================== ADD SLIDEUP ANIMATION ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== SKILL BARS ANIMATION ====================
const skillBars = document.querySelectorAll('.skill-progress, .meter-fill');
const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==================== SKILL MODAL DATA ====================
const skillsData = {
    graphics: {
        icon: '🎨',
        title: 'Graphics Designing',
        subtitle: 'Expert in Adobe Creative Suite',
        description: 'I started my graphics designing journey in August 2023 and have mastered professional design tools. I create stunning visuals including posters, social media designs, logos, and illustrations.',
        software: [
            { icon: '🎨', name: 'Adobe Photoshop', level: 'Expert' },
            { icon: '✏️', name: 'Adobe Illustrator', level: 'Expert' },
            { icon: '🎭', name: 'Figma', level: 'Expert' },
            { icon: '🖌️', name: 'Krita', level: 'Advanced' },
            { icon: '🎬', name: 'Adobe Animate', level: 'Advanced' }
        ],
        skills: [
            { label: 'Photoshop', percentage: 95 },
            { label: 'Illustrator', percentage: 90 },
            { label: 'Figma', percentage: 92 },
            { label: 'Digital Art', percentage: 88 }
        ]
    },
    uiux: {
        icon: '🎭',
        title: 'UI/UX Designing',
        subtitle: 'Creating Beautiful User Experiences',
        description: 'Specialized in designing intuitive and beautiful user interfaces. I focus on user experience, accessibility, and modern design principles.',
        software: [
            { icon: '🎭', name: 'Figma', level: 'Expert' },
            { icon: '🎨', name: 'Adobe XD', level: 'Advanced' },
            { icon: '📐', name: 'Sketch', level: 'Intermediate' },
            { icon: '🖼️', name: 'Prototyping', level: 'Expert' }
        ],
        skills: [
            { label: 'UI Design', percentage: 90 },
            { label: 'UX Research', percentage: 85 },
            { label: 'Prototyping', percentage: 88 },
            { label: 'Design Systems', percentage: 85 }
        ]
    },
    webdev: {
        icon: '💻',
        title: 'Website Development',
        subtitle: 'Building Modern Web Applications',
        description: 'I develop responsive, modern websites using HTML5, CSS3, and JavaScript. I create landing pages, portfolios, and business websites with smooth animations and excellent user experience.',
        software: [
            { icon: '🌐', name: 'HTML5', level: 'Expert' },
            { icon: '🎨', name: 'CSS3', level: 'Expert' },
            { icon: '⚙️', name: 'JavaScript', level: 'Advanced' },
            { icon: '⚛️', name: 'React', level: 'Intermediate' }
        ],
        skills: [
            { label: 'HTML5', percentage: 95 },
            { label: 'CSS3', percentage: 92 },
            { label: 'JavaScript', percentage: 80 },
            { label: 'Responsive Design', percentage: 90 }
        ]
    },
    gamedev: {
        icon: '🎮',
        title: 'Game Development',
        subtitle: 'Creating Interactive Games',
        description: 'I develop games using Unity engine with C# programming. I create 2D and 3D games with engaging gameplay mechanics and polished visuals.',
        software: [
            { icon: '🎮', name: 'Unity', level: 'Advanced' },
            { icon: '📝', name: 'C#', level: 'Advanced' },
            { icon: '🎯', name: 'Game Design', level: 'Intermediate' },
            { icon: '🎬', name: 'Animation', level: 'Intermediate' }
        ],
        skills: [
            { label: 'Unity', percentage: 85 },
            { label: 'C# Programming', percentage: 82 },
            { label: 'Game Mechanics', percentage: 80 },
            { label: 'Physics', percentage: 75 }
        ]
    },
    animation: {
        icon: '✨',
        title: '2D Animation',
        subtitle: 'Bringing Characters to Life',
        description: 'I create engaging 2D animations using professional tools. From character animations to motion graphics, I bring stories to life with smooth, professional animations.',
        software: [
            { icon: '🖌️', name: 'Krita', level: 'Advanced' },
            { icon: '🎬', name: 'Adobe Animate', level: 'Advanced' },
            { icon: '🎞️', name: 'Aseprite', level: 'Intermediate' },
            { icon: '✨', name: 'Motion Graphics', level: 'Intermediate' }
        ],
        skills: [
            { label: 'Character Animation', percentage: 75 },
            { label: 'Motion Graphics', percentage: 70 },
            { label: 'Storyboarding', percentage: 80 },
            { label: 'Frame-by-Frame', percentage: 75 }
        ]
    },
    '3d': {
        icon: '🎯',
        title: '3D Modeling',
        subtitle: 'Creating 3D Assets',
        description: 'Learning 3D modeling with Blender. I create 3D models, environments, and visualizations for games and animations.',
        software: [
            { icon: '🎯', name: 'Blender', level: 'Beginner' },
            { icon: '📦', name: 'Modeling', level: 'Beginner' },
            { icon: '💡', name: 'Lighting', level: 'Beginner' },
            { icon: '🎨', name: 'Texturing', level: 'Beginner' }
        ],
        skills: [
            { label: 'Blender', percentage: 50 },
            { label: '3D Modeling', percentage: 45 },
            { label: 'UV Mapping', percentage: 40 },
            { label: 'Rendering', percentage: 45 }
        ]
    },
    technical: {
        icon: '🔧',
        title: 'Technical Skills',
        subtitle: 'IT & System Expertise',
        description: 'Expert in computer troubleshooting, networking, and system administration. I solve complex technical problems and optimize system performance.',
        software: [
            { icon: '💻', name: 'Windows', level: 'Expert' },
            { icon: '🌐', name: 'Networking', level: 'Expert' },
            { icon: '📡', name: 'IP Config', level: 'Expert' },
            { icon: '⚙️', name: 'System Admin', level: 'Expert' }
        ],
        skills: [
            { label: 'Troubleshooting', percentage: 100 },
            { label: 'Networking', percentage: 95 },
            { label: 'System Optimization', percentage: 95 },
            { label: 'Problem Solving', percentage: 90 }
        ]
    },
    ai: {
        icon: '🤖',
        title: 'AI Tools Expertise',
        subtitle: 'Leveraging AI for Productivity',
        description: 'I am proficient in using modern AI tools to increase productivity and accomplish complex tasks efficiently. I can do the work of 10 people using AI tools.',
        software: [
            { icon: '🤖', name: 'ChatGPT', level: 'Expert' },
            { icon: '🧠', name: 'Claude', level: 'Expert' },
            { icon: '✨', name: 'Gemini', level: 'Expert' },
            { icon: '🎨', name: 'Midjourney', level: 'Advanced' }
        ],
        skills: [
            { label: 'ChatGPT', percentage: 95 },
            { label: 'Claude', percentage: 93 },
            { label: 'Gemini', percentage: 90 },
            { label: 'Prompt Engineering', percentage: 92 }
        ]
    },
    office: {
        icon: '📊',
        title: 'Office Suite',
        subtitle: 'Professional Office Tools',
        description: 'Expert in Microsoft Office Suite. I create professional documents, spreadsheets with complex formulas, and impressive presentations.',
        software: [
            { icon: '📄', name: 'MS Word', level: 'Expert' },
            { icon: '📊', name: 'MS Excel', level: 'Expert' },
            { icon: '🎯', name: 'PowerPoint', level: 'Advanced' },
            { icon: '📋', name: 'Access', level: 'Intermediate' }
        ],
        skills: [
            { label: 'Word', percentage: 100 },
            { label: 'Excel', percentage: 100 },
            { label: 'PowerPoint', percentage: 95 },
            { label: 'Formulas & Macros', percentage: 90 }
        ]
    }
};

// ==================== SKILL MODAL FUNCTIONS ====================
function openSkillModal(skillId) {
    const skill = skillsData[skillId];
    if (!skill) return;

    const modal = document.getElementById('skillModal');
    const body = document.getElementById('skillModalBody');

    let softwareHTML = skill.software.map(sw => `
        <div class="software-item">
            <div class="software-icon">${sw.icon}</div>
            <h4>${sw.name}</h4>
            <p>${sw.level}</p>
        </div>
    `).join('');

    let skillsHTML = skill.skills.map(s => `
        <div class="skill-progress-bar">
            <label>${s.label}</label>
            <div class="bar">
                <div class="fill" style="width: ${s.percentage}%"></div>
            </div>
            <span class="percentage">${s.percentage}%</span>
        </div>
    `).join('');

    body.innerHTML = `
        <div class="skill-modal-header">
            <div class="skill-modal-icon">${skill.icon}</div>
            <div>
                <h2>${skill.title}</h2>
                <p>${skill.subtitle}</p>
            </div>
        </div>

        <div class="skill-modal-section">
            <h3>📖 About</h3>
            <p>${skill.description}</p>
        </div>

        <div class="skill-modal-section">
            <h3>🛠️ Software & Tools</h3>
            <div class="software-grid">
                ${softwareHTML}
            </div>
        </div>

        <div class="skill-modal-section">
            <h3>📊 Skill Levels</h3>
            ${skillsHTML}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSkillModal() {
    const modal = document.getElementById('skillModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('skillModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSkillModal();
            }
        });
    }
});

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c🎨 Welcome to Umar Hanan\'s Portfolio!', 'font-size: 20px; color: #FF6B6B; font-weight: bold;');
console.log('%cCreated with HTML, CSS & JavaScript', 'font-size: 14px; color: #4ECDC4;');
