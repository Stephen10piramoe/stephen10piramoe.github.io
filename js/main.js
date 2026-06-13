// ========== DARK MODE TOGGLE ==========
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
if (toggle) {
  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ========== ENHANCED SCROLL REVEAL ==========
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));
}

// ========== INTERACTIVE SKILL TAGS ==========
const tags = document.querySelectorAll('.tag');
if (tags.length > 0) {
  tags.forEach(tag => {
    tag.addEventListener('click', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = '';
      }, 10);
    });
  });
}

// ========== SMOOTH ANCHOR SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
  document.body.style.animation = 'fadeIn 0.6s ease-out';
});

// ========== FLOATING AVATAR EFFECT ==========
const avatar = document.querySelector('.hero-avatar');
if (avatar) avatar.classList.add('float-item');

// ========== AVATAR UPLOAD (client-side preview + persistence) ==========
const avatarInput = document.getElementById('avatarInput');
const uploadBtn = document.getElementById('uploadAvatarBtn');
const removeBtn = document.getElementById('removeAvatarBtn');
const avatarInner = document.getElementById('avatarInner');
const defaultAvatar = document.getElementById('defaultAvatar');

function setAvatarDataURL(dataURL) {
  if (!avatarInner) return;
  // hide the fallback image if we have an explicit profile photo
  if (defaultAvatar) defaultAvatar.style.display = 'none';
  let img = avatarInner.querySelector('img:not(#defaultAvatar)');
  if (!img) {
    img = document.createElement('img');
    avatarInner.insertBefore(img, avatarInner.firstChild);
  }
  img.src = dataURL;
  avatarInner.classList.add('has-photo');
  localStorage.setItem('avatarData', dataURL);
  if (removeBtn) removeBtn.style.display = 'inline-flex';
}

function removeAvatar() {
  if (!avatarInner) return;
  const img = avatarInner.querySelector('img:not(#defaultAvatar)');
  if (img) img.remove();
  avatarInner.classList.remove('has-photo');
  localStorage.removeItem('avatarData');
  if (defaultAvatar) defaultAvatar.style.display = 'block';
  if (removeBtn) removeBtn.style.display = 'none';
}

if (defaultAvatar) {
  defaultAvatar.addEventListener('load', () => {
    avatarInner.classList.add('has-photo');
  });
  defaultAvatar.addEventListener('error', () => {
    defaultAvatar.style.display = 'none';
  });
}

// Load saved avatar on start
const savedAvatar = localStorage.getItem('avatarData');
if (savedAvatar && avatarInner) setAvatarDataURL(savedAvatar);

if (uploadBtn && avatarInput) {
  uploadBtn.addEventListener('click', () => avatarInput.click());
}
if (avatarInput) {
  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarDataURL(reader.result);
    reader.readAsDataURL(file);
  });
}
if (removeBtn) removeBtn.addEventListener('click', removeAvatar);

// ========== MOUSE MOVE EFFECT ON NAV ==========
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ========== PERFORMANCE OBSERVER FOR SCROLL EFFECTS ==========
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Add scroll-based effects here
      ticking = false;
    });
    ticking = true;
  }
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
  // Press 'G' to go to GitHub
  if (e.key === 'g' && !e.ctrlKey && !e.metaKey) {
    const github = document.querySelector('a[href*="github.com"]');
    if (github) github.click();
  }
  // Press 'C' to go to Contact
  if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  }
});