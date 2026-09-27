/**
 * Sanskruthi Shedole - Portfolio Interactive Logic
 * Features: Neural Canvas, Scrollspy, Mobile Drawer, Theme Switcher,
 *           Skills Filter, Interactive Simulators, Modal System, Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. DYNAMIC YEAR
  // -------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------
  // 2. THEME SWITCHER (DARK / LIGHT MODE)
  // -------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('portfolio-theme', 'dark');
        showToast('Switched to Dark Mode');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('portfolio-theme', 'light');
        showToast('Switched to Light Mode');
      }
    });
  }

  // -------------------------------------------------------------
  // 3. TOAST NOTIFICATION SYSTEM
  // -------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message, iconClass = 'fa-solid fa-circle-check') {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    const iconEl = toast.querySelector('.toast-icon i');
    if (iconEl) iconEl.className = iconClass;

    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // -------------------------------------------------------------
  // 4. STICKY HEADER & SCROLLSPY
  // -------------------------------------------------------------
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header background blur on scroll
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }

    // Scrollspy section highlight
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------
  // 5. MOBILE DRAWER NAVIGATION
  // -------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // -------------------------------------------------------------
  // 6. SKILLS CATEGORY FILTERING
  // -------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------
  // 7. MODAL MANAGEMENT SYSTEM
  // -------------------------------------------------------------
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal');
      closeModal(parentModal);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ESC key to close any active modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // Open Resume Modal triggers
  const resumeTriggers = document.querySelectorAll('.open-resume-modal');
  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal('resume-modal'));
  });

  // Open Noise Level Simulator Modal triggers
  const noiseTriggers = document.querySelectorAll('.open-noise-demo');
  noiseTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal('noise-modal'));
  });

  // Open Professor Availability Simulator Modal triggers
  const profTriggers = document.querySelectorAll('.open-prof-demo');
  profTriggers.forEach(btn => {
    btn.addEventListener('click', () => openModal('prof-modal'));
  });

  // Placeholder Link Interceptors
  const placeholderTriggers = document.querySelectorAll('.placeholder-trigger');
  const placeholderItemName = document.getElementById('placeholder-item-name');
  const placeholderExplanation = document.getElementById('placeholder-explanation');

  placeholderTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const type = trigger.getAttribute('data-placeholder-type') || 'External Profile';
      if (placeholderItemName) {
        placeholderItemName.textContent = type;
      }
      if (placeholderExplanation) {
        placeholderExplanation.textContent = `This button is currently configured as a placeholder for Sanskruthi's verified ${type} link so that no fictitious accounts or unverified URLs are introduced.`;
      }
      openModal('placeholder-modal');
    });
  });

  // -------------------------------------------------------------
  // 8. COPY TO CLIPBOARD HANDLERS
  // -------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const emailToCopy = 'sanskruthi.shedole@example.com';

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          showToast('Email address copied to clipboard!');
        }).catch(() => {
          fallbackCopyText(emailToCopy);
        });
      } else {
        fallbackCopyText(emailToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Email address copied to clipboard!');
    } catch (err) {
      showToast('Could not copy. Please select text manually.', 'fa-solid fa-triangle-exclamation');
    }
    document.body.removeChild(tempInput);
  }

  // -------------------------------------------------------------
  // 9. NOISE LEVEL INDICATOR SIMULATOR LOGIC
  // -------------------------------------------------------------
  const noiseSlider = document.getElementById('noise-slider');
  const simDbVal = document.getElementById('sim-db-val');
  const classificationBox = document.getElementById('classification-box');
  const classText = document.getElementById('class-text');
  const meterBarFill = document.getElementById('meter-bar-fill');
  const presetBtns = document.querySelectorAll('.preset-btn');

  function updateNoiseSimulation(db) {
    const val = parseInt(db, 10);
    if (simDbVal) simDbVal.textContent = `${val} dB`;
    if (meterBarFill) {
      // 10 to 110 scale mapped to 0% - 100%
      const percentage = Math.min(100, Math.max(5, ((val - 10) / 100) * 100));
      meterBarFill.style.width = `${percentage}%`;
    }

    if (classificationBox && classText) {
      classificationBox.classList.remove('quiet', 'moderate', 'high');

      if (val < 40) {
        classificationBox.classList.add('quiet');
        classText.textContent = 'QUIET (Low Acoustic Intensity)';
      } else if (val <= 70) {
        classificationBox.classList.add('moderate');
        classText.textContent = 'MODERATE (Normal Ambient Range)';
      } else {
        classificationBox.classList.add('high');
        classText.textContent = 'HIGH (Elevated Noise Level)';
      }
    }
  }

  if (noiseSlider) {
    noiseSlider.addEventListener('input', e => {
      updateNoiseSimulation(e.target.value);
    });

    // Initialize with default 48 dB
    updateNoiseSimulation(noiseSlider.value);
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const db = btn.getAttribute('data-db');
      if (noiseSlider) noiseSlider.value = db;
      updateNoiseSimulation(db);
    });
  });

  // -------------------------------------------------------------
  // 10. PROFESSOR AVAILABILITY SYSTEM SIMULATOR LOGIC
  // -------------------------------------------------------------
  const profSearchInput = document.getElementById('prof-search-input');
  const profDeptFilter = document.getElementById('prof-dept-filter');
  const profCards = document.querySelectorAll('.prof-card');

  function filterProfessors() {
    const query = (profSearchInput ? profSearchInput.value : '').toLowerCase().trim();
    const dept = profDeptFilter ? profDeptFilter.value : 'all';

    profCards.forEach(card => {
      const cardDept = card.getAttribute('data-dept');
      const cardName = (card.getAttribute('data-name') || '').toLowerCase();
      const cardText = card.textContent.toLowerCase();

      const matchesDept = (dept === 'all' || cardDept === dept);
      const matchesQuery = (!query || cardName.includes(query) || cardText.includes(query));

      if (matchesDept && matchesQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (profSearchInput) {
    profSearchInput.addEventListener('input', filterProfessors);
  }

  if (profDeptFilter) {
    profDeptFilter.addEventListener('change', filterProfessors);
  }

  // -------------------------------------------------------------
  // 11. CONTACT FORM VALIDATION & HANDLING
  // -------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameGroup = nameInput.closest('.form-group');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = emailInput.closest('.form-group');
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = messageInput.closest('.form-group');
      if (!messageInput.value.trim()) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (isValid) {
        const senderName = nameInput.value.trim();
        showToast(`Thank you, ${senderName}! Message draft recorded. Connect directly via email.`);
        contactForm.reset();
      }
    });

    // Realtime error clearing
    [nameInput, emailInput, messageInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          const group = inp.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }

  // -------------------------------------------------------------
  // 12. INTERACTIVE NEURAL CONSTELLATION CANVAS
  // -------------------------------------------------------------
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 42;
    const maxDistance = 140;

    let mouse = {
      x: null,
      y: null,
      radius: 120
    };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = dx / dist;
            const dirY = dy / dist;
            this.x -= dirX * force * 1.5;
            this.y -= dirY * force * 1.5;
          }
        }
      }

      draw() {
        const isLight = document.body.classList.contains('light-theme');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(56, 189, 248, 0.65)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = window.innerWidth < 768 ? 22 : particleCount;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function drawLines() {
      const isLight = document.body.classList.contains('light-theme');
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isLight ? 0.15 : 0.22);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLight
              ? `rgba(79, 70, 229, ${alpha})`
              : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animate();
  }
});
