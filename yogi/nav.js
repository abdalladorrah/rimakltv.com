/**
 * nav.js
 * Handles dynamic navigation rendering, nested dropdowns, and language toggling.
 */

const translations = {
    ar: {
        dashboard: '📊 الرئيسية',

        // Categories
        cat_strategy: 'الاستراتيجية',
        cat_exec: 'التنفيذ',
        cat_market: 'دراسة السوق',

        // Items
        vision: 'الرؤية',
        master: 'الاستراتيجية الشاملة',
        revenue: 'محرك الإيرادات',

        plan: 'خطة العمل',
        budget: 'الميزانية والتوقعات',
        timeline: 'الجدول الزمني',
        checklist: 'قائمة المهام',

        persona: 'الجمهور المستهدف',
        journey: 'رحلة العميل',
        retention: 'منظومة نمو العملاء',

        langBtn: 'Switch to English'
    },
    en: {
        dashboard: '📊 Dashboard',

        // Categories
        cat_strategy: 'Strategy',
        cat_exec: 'Execution',
        cat_market: 'Market Study',

        // Items
        vision: 'Vision',
        master: 'Comprehensive Strategy',
        revenue: 'Revenue Engine',

        plan: 'Action Plan',
        budget: 'Budget & Forecast',
        timeline: 'Timeline',
        checklist: 'Task List',

        persona: 'Target Audience',
        journey: 'Customer Journey',
        retention: 'Customer Growth System',

        langBtn: 'التبديل للعربية'
    }
};

const navItems = [
    { key: 'dashboard', href: 'index.html' },

    // STRATEGY DROPDOWN
    {
        key: 'cat_strategy',
        children: [
            { key: 'master', href: 'Lenci.html' },
            { key: 'vision', href: 'vision.html' },
            { key: 'revenue', href: 'revenue.html' }
        ]
    },

    // EXECUTION DROPDOWN
    {
        key: 'cat_exec',
        children: [
            { key: 'plan', href: 'plan.html' },
            { key: 'budget', href: 'budget.html' },
            { key: 'timeline', href: 'timeline.html' },
            { key: 'checklist', href: 'checklist.html' }
        ]
    },

    // MARKET DROPDOWN
    {
        key: 'cat_market',
        children: [
            { key: 'persona', href: 'persona.html' },
            { key: 'journey', href: 'journey.html' },
            { key: 'retention', href: 'retention.html' }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Language First to know what to render
    const currentLang = localStorage.getItem('mtk-lang') || 'ar';

    // 2. Render Nav
    renderNavigation(currentLang);

    // 3. Apply Language Settings (Direction, Fonts, Content Visibility)
    initLanguage();
});

function renderNavigation(lang = 'ar') {
    // Clear existing if any (for re-render)
    const existingNav = document.querySelector('.navbar');
    if (existingNav) existingNav.remove();
    const existingBtn = document.querySelector('.floating-lang-btn');
    if (existingBtn) existingBtn.remove();

    const t = translations[lang];

    // Generate Links HTML (Recursive-ish logic for depth 1)
    let linksHTML = '';

    navItems.forEach(item => {
        if (item.children) {
            // Dropdown
            let subItems = '';
            item.children.forEach(sub => {
                subItems += `<a href="${sub.href}" class="dropdown-item" data-page="${sub.href}">${t[sub.key]}</a>`;
            });

            linksHTML += `
            <div class="dropdown">
                <div class="nav-link dropdown-toggle">${t[item.key]}</div>
                <div class="dropdown-menu">
                    ${subItems}
                </div>
            </div>`;
        } else {
            // Single Link
            linksHTML += `<a href="${item.href}" class="nav-link" data-page="${item.href}">${t[item.key]}</a>`;
        }
    });

    const navHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">YOGI<span class="dot">.</span></a>
            
            <div class="nav-links">
                ${linksHTML}
            </div>
            
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
        </div>
    </nav>

    <!-- Floating Language Data -->
    <button class="floating-lang-btn" onclick="toggleLanguage()">
        <span class="lang-icon">🌐</span>
        <span class="lang-text">${t.langBtn}</span>
    </button>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Set Active Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link, .dropdown-item');

    links.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');

            // If it's inside a dropdown, highlight parent too? 
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const toggle = parentDropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.classList.add('active');
            }
        }
    });
}

// Mobile Menu Toggle with Animation & Scroll Lock
function toggleMobileMenu() {
    const linksContainer = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;

    const isVisible = linksContainer.classList.contains('mobile-visible');

    if (isVisible) {
        // Close Menu
        linksContainer.classList.remove('mobile-visible');
        menuBtn.innerHTML = '☰'; // Hamburger Icon
        body.classList.remove('menu-open');
    } else {
        // Open Menu
        linksContainer.classList.add('mobile-visible');
        menuBtn.innerHTML = '✕'; // Close Icon
        body.classList.add('menu-open');
    }
}

// Auto-Close Menu on Link Click (Delegation)
document.addEventListener('click', (e) => {
    // Check if clicked element is a link (nav-link or dropdown-item)
    // AND it has an href (so it's not a folder toggler)
    const isLink = (e.target.classList.contains('nav-link') || e.target.classList.contains('dropdown-item')) && e.target.hasAttribute('href');

    if (isLink && document.body.classList.contains('menu-open')) {
        toggleMobileMenu(); // Close it
    }
});

// Language Logic
function initLanguage() {
    const savedLang = localStorage.getItem('mtk-lang') || 'ar';
    updatePageLanguage(savedLang);
}

function toggleLanguage() {
    const currentLang = localStorage.getItem('mtk-lang') || 'ar';
    const newLang = currentLang === 'ar' ? 'en' : 'ar';

    setLanguage(newLang);
}

function setLanguage(lang) {
    localStorage.setItem('mtk-lang', lang);
    updatePageLanguage(lang);
    renderNavigation(lang); // Re-render nav to update text
}

function updatePageLanguage(lang) {
    const body = document.body;

    // Content blocks specific to page content
    const arContent = document.getElementById('content-ar');
    const enContent = document.getElementById('content-en');

    if (lang === 'en') {
        body.classList.remove('lang-ar');
        body.classList.add('lang-en');
        body.setAttribute('dir', 'ltr'); // Force LTR for English

        if (arContent && enContent) {
            arContent.classList.remove('visible');
            arContent.classList.add('hidden');
            enContent.classList.remove('hidden');
            enContent.classList.add('visible');
        }
    } else {
        body.classList.remove('lang-en');
        body.classList.add('lang-ar');
        body.setAttribute('dir', 'rtl'); // Force RTL for Arabic

        if (arContent && enContent) {
            enContent.classList.remove('visible');
            enContent.classList.add('hidden');
            arContent.classList.remove('hidden');
            arContent.classList.add('visible');
        }
    }
}
