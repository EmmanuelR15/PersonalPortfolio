// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe all scroll reveal elements
document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggleBtn.querySelector('.fa-moon').style.display = isDark ? 'none' : 'block';
    themeToggleBtn.querySelector('.fa-sun').style.display = isDark ? 'block' : 'none';
});

// Floating theme toggle button logic
const themeFab = document.getElementById('theme-toggle-fab');
if (themeFab) {
    themeFab.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeFab.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    // Set initial icon on load
    window.addEventListener('DOMContentLoaded', () => {
        const icon = themeFab.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    });
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        this.style.setProperty('--x', `${x}px`);
        this.style.setProperty('--y', `${y}px`);
    });
});

// Skills data with categories
const skills = {
    frontend: [
        { name: 'HTML5', level: 90, icon: 'fab fa-html5' },
        { name: 'CSS3', level: 85, icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', level: 80, icon: 'fab fa-js' },
        { name: 'React', level: 75, icon: 'fab fa-react' }
    ],
    backend: [
        { name: 'Node.js', level: 70, icon: 'fab fa-node-js' },
        { name: 'Python', level: 75, icon: 'fab fa-python' },
        { name: 'SQL', level: 80, icon: 'fas fa-database' },
        { name: 'MongoDB', level: 75, icon: 'fas fa-server' }
    ],
    tools: [
        { name: 'Git', level: 85, icon: 'fab fa-git-alt' },
        { name: 'Docker', level: 70, icon: 'fab fa-docker' },
        { name: 'AWS', level: 65, icon: 'fab fa-aws' },
        { name: 'VS Code', level: 90, icon: 'fas fa-code' }
    ]
};

// Projects data with categories
const projects = [
    {
        title: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico construida con React y Node.js',
        technologies: ['React', 'Node.js', 'MongoDB'],
        image: 'path/to/image1.jpg',
        link: '#',
        category: 'web'
    },
    {
        title: 'Mobile App',
        description: 'Aplicación móvil para gestión de tareas',
        technologies: ['React Native', 'Firebase'],
        image: 'path/to/image2.jpg',
        link: '#',
        category: 'mobile'
    },
    {
        title: 'AI Project',
        description: 'Sistema de recomendación basado en machine learning',
        technologies: ['Python', 'TensorFlow', 'Flask'],
        image: 'path/to/image3.jpg',
        link: '#',
        category: 'other'
    }
];

// Articles data
const articles = [
    {
        title: 'Mejores Prácticas en React',
        description: 'Guía completa de mejores prácticas para desarrollo en React',
        date: '2024-03-15',
        link: '#',
        readTime: '5 min'
    },
    {
        title: 'Introducción a Docker',
        description: 'Aprende los conceptos básicos de Docker y contenedores',
        date: '2024-03-10',
        link: '#',
        readTime: '8 min'
    }
];

// Render skills with categories
function renderSkills() {
    Object.entries(skills).forEach(([category, categorySkills]) => {
        const skillsGrid = document.querySelector(`.category:nth-child(${getCategoryIndex(category)}) .skills-grid`);
        categorySkills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-card';
            skillElement.innerHTML = `
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <div class="skill-bar">
                    <div class="skill-level" style="width: ${skill.level}%"></div>
                </div>
            `;
            skillsGrid.appendChild(skillElement);
        });
    });
}

function getCategoryIndex(category) {
    const categories = ['frontend', 'backend', 'tools'];
    return categories.indexOf(category) + 1;
}

// Render projects with filtering
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function filterProjects(category) {
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category === category);
        
        projectsGrid.innerHTML = '';
        filteredProjects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card';
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link">Ver proyecto</a>
            `;
            projectsGrid.appendChild(projectElement);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });

    filterProjects('all');
}

// Render articles
function renderArticles() {
    const articlesGrid = document.querySelector('.articles-grid');
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article-card';
        articleElement.innerHTML = `
            <div class="article-date">
                <span>${new Date(article.date).toLocaleDateString()}</span>
                <span class="read-time">${article.readTime}</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" class="article-link">Leer más</a>
        `;
        articlesGrid.appendChild(articleElement);
    });
}

// Code examples
const clusteringCode = `
function kMeansClustering(data, k) {
    // Initialize centroids randomly
    let centroids = data.slice(0, k);
    
    while (true) {
        // Assign points to nearest centroid
        let clusters = Array(k).fill().map(() => []);
        data.forEach(point => {
            let minDist = Infinity;
            let cluster = 0;
            centroids.forEach((centroid, i) => {
                let dist = euclideanDistance(point, centroid);
                if (dist < minDist) {
                    minDist = dist;
                    cluster = i;
                }
            });
            clusters[cluster].push(point);
        });
        
        // Update centroids
        let newCentroids = clusters.map(cluster => {
            return cluster.reduce((acc, point) => {
                return acc.map((val, i) => val + point[i] / cluster.length);
            }, Array(data[0].length).fill(0));
        });
        
        // Check convergence
        if (centroids.every((centroid, i) => 
            centroid.every((val, j) => Math.abs(val - newCentroids[i][j]) < 0.0001))) {
            break;
        }
        centroids = newCentroids;
    }
    return clusters;
}`;

const validationCode = `
function validateForm(data) {
    const errors = {};
    
    // Email validation
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)) {
        errors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }
    
    // Name validation
    if (!data.name) {
        errors.name = 'Name is required';
    } else if (data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}`;

// Code examples with copy functionality
function initializeCodeExamples() {
    const codeBlocks = document.querySelectorAll('pre code');
    const copyButtons = document.querySelectorAll('.copy-btn');

    codeBlocks[0].textContent = clusteringCode;
    codeBlocks[1].textContent = validationCode;

    copyButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const code = codeBlocks[index].textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
    });
}

// Form submission with validation
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        showNotification('Gracias por tu mensaje. Te responderé pronto.');
        contactForm.reset();
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('¡Gracias por suscribirte!');
        newsletterForm.reset();
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Project filter logic
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    renderArticles();
    initializeCodeExamples();
    initializeForms();
});