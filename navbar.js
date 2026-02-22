/**
 * navbar.js — Doon TejasMind
 * Shared navigation for all pages.
 * To update nav links site-wide, edit ONLY this file.
 *
 * Usage: Add this ONE line before </body> on every page:
 *   <script src="navbar.js"></script>
 *   And add <div id="dtm-navbar"></div> at the top of <body>.
 */

(function () {
  const NAV_LINKS = [
    { label: 'Home',             href: 'index.html' },
    { label: 'About',            href: 'about.html' },
    { label: 'Courses',          href: 'courses.html' },
    { label: 'Student Zone',     href: 'student-zone.html' },
    { label: 'Office Solutions', href: 'office-zone.html' },
    { label: 'Contact',          href: 'contact.html' },
  ];

  // Detect current page
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    return href === currentFile || (currentFile === '' && href === 'index.html');
  }

  // Build desktop nav links
  function desktopLinks() {
    return NAV_LINKS.map(link => {
      const active = isActive(link.href);
      return `
        <a href="${link.href}" class="text-${active ? 'blue-600 font-semibold' : 'gray-600 hover:text-blue-600 font-medium'} text-sm transition-colors relative group">
          ${link.label}
          <span class="absolute -bottom-1 left-0 ${active ? 'w-full' : 'w-0 group-hover:w-full'} h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-300"></span>
        </a>`;
    }).join('');
  }

  // Build mobile nav links
  function mobileLinks() {
    return NAV_LINKS.map(link => {
      const active = isActive(link.href);
      return `<a href="${link.href}" class="${active ? 'text-blue-600 font-semibold' : 'text-gray-700 font-medium hover:text-blue-600 transition-colors'}">${link.label}</a>`;
    }).join('\n    ');
  }

  const navHTML = `
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50" style="transition:all 0.4s ease;">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between py-3">

      <!-- Logo -->
      <a href="index.html" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background:linear-gradient(135deg,#1d72ee,#14b8a6);">
          <span class="text-white font-bold text-lg">TM</span>
        </div>
        <div>
          <span class="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors">Doon</span>
          <span class="font-black text-xl" style="background:linear-gradient(135deg,#1d72ee 0%,#14b8a6 60%,#fbbf24 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;"> TejasMind</span>
        </div>
      </a>

      <!-- Desktop links -->
      <div class="hidden md:flex items-center gap-8">
        ${desktopLinks()}
      </div>

      <!-- CTA -->
      <a href="contact.html" class="hidden md:inline-flex text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-lg" style="background:linear-gradient(135deg,#1d72ee,#14b8a6);">
        <span>Contact Us</span>
      </a>

      <!-- Hamburger -->
      <button id="dtm-menu-toggle" class="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
        <svg id="dtm-icon-open"  class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        <svg id="dtm-icon-close" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  <div id="dtm-mobile-menu" class="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-6 shadow-xl" style="display:none;flex-direction:column;gap:1rem;">
    ${mobileLinks()}
    <a href="contact.html" class="text-white font-semibold px-6 py-3 rounded-full text-center shadow-lg mt-2" style="background:linear-gradient(135deg,#1d72ee,#14b8a6);">Contact Us</a>
  </div>
</nav>`;

  // Inject navbar
  const target = document.getElementById('dtm-navbar');
  if (target) {
    target.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(248,250,255,0.92)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 4px 30px rgba(29,114,238,0.08)';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
      navbar.style.boxShadow = '';
    }
  });

  // Mobile menu toggle
  document.getElementById('dtm-menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('dtm-mobile-menu');
    const iconOpen  = document.getElementById('dtm-icon-open');
    const iconClose = document.getElementById('dtm-icon-close');
    const isOpen = menu.style.display === 'flex';
    menu.style.display = isOpen ? 'none' : 'flex';
    iconOpen.classList.toggle('hidden', !isOpen);
    iconClose.classList.toggle('hidden', isOpen);
  });

  // Close mobile menu on link click
  document.querySelectorAll('#dtm-mobile-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.getElementById('dtm-mobile-menu').style.display = 'none';
      document.getElementById('dtm-icon-open').classList.remove('hidden');
      document.getElementById('dtm-icon-close').classList.add('hidden');
    });
  });

})();