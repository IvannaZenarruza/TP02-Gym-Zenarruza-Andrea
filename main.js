document.addEventListener('DOMContentLoaded', () => {
  const counterValueElement = document.querySelector('.counter-value');
  if (!counterValueElement) return;

  const finalCount = parseInt(counterValueElement.getAttribute('data-final'));
  const duration = 2000;
  const interval = duration / Math.abs(finalCount);
  const resetIntervalTime = 15000;

  let currentCount = 0;
  let increment = finalCount > 0 ? 1 : -1;
  let timeoutId;

  function updateCounter() {
      counterValueElement.textContent = currentCount;
      if ((increment > 0 && currentCount < finalCount) || (increment < 0 && currentCount > finalCount)) {
          currentCount += increment;
          timeoutId = setTimeout(updateCounter, interval);
      } else {
          setTimeout(resetCounter, resetIntervalTime);
      }
  }

  function resetCounter() {
      currentCount = 0;
      increment = finalCount > 0 ? 1 : -1;
      counterValueElement.textContent = currentCount;
      setTimeout(updateCounter, 500);
  }

  updateCounter();
});

function setupMasonryGrid() {
  const grid = document.querySelector('.grid-fotos');
  if (!grid) return;

  const gridItems = grid.querySelectorAll('.foto-card');
  const rowHeight = 10;
  const rowGap = 30;

  gridItems.forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;

      if (img.complete) {
          calculateRowSpan(item, img, rowHeight, rowGap);
      } else {
          img.addEventListener('load', () => {
              calculateRowSpan(item, img, rowHeight, rowGap);
          });
      }
  });
}

function calculateRowSpan(item, img, rowHeight, rowGap) {
  const height = img.getBoundingClientRect().height;
  const rowSpan = Math.ceil((height + rowGap) / rowHeight);
  item.style.gridRowEnd = `span ${rowSpan}`;
}

document.addEventListener('DOMContentLoaded', setupMasonryGrid);

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.testimonial-slide');

  if (!carousel || slides.length === 0) return;

  slides.forEach(slide => {
      const imageWrapper = slide.querySelector('.testimonial-image-wrapper');

      slide.addEventListener('mouseenter', () => {
          slide.style.transform = 'scale(1.05)';
          slide.style.transition = 'transform 0.3s ease-in-out';
          slide.style.zIndex = '10';

          if (imageWrapper) {
              imageWrapper.style.transform = 'translate(-50%, -55%) scale(1.1)';
              imageWrapper.style.transition = 'transform 0.3s ease-in-out';
          }
      });

      slide.addEventListener('mouseleave', () => {
          slide.style.transform = 'scale(1)';
          slide.style.zIndex = 'auto';

          if (imageWrapper) {
              imageWrapper.style.transform = 'translate(-50%, -50%) scale(1)';
          }
      });
  });

  // Cancelar animaciones automáticas si existen
  const styleSheet = document.styleSheets[0];
  const keyframesRuleIndex = Array.from(styleSheet.cssRules).findIndex(rule => rule.name === 'scrollCarousel');
  if (keyframesRuleIndex !== -1) {
      styleSheet.deleteRule(keyframesRuleIndex);
      carousel.style.animation = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.formulario-contacto');
  const modal = document.getElementById('modal-confirmacion');
  const closeButton = document.querySelector('.close-button');

  function validateName(name) {
      return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
  }

  function validatePhone(phone) {
      return /^[0-9+()\-\s]+$/.test(phone);
  }

  form?.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre');
      const apellido = document.getElementById('apellido');
      const telefono = document.getElementById('telefono');

      if (!validateName(nombre.value)) {
          nombre.setCustomValidity('El nombre no debe contener números');
          nombre.reportValidity();
          return;
      } else {
          nombre.setCustomValidity('');
      }

      if (!validateName(apellido.value)) {
          apellido.setCustomValidity('El apellido no debe contener números');
          apellido.reportValidity();
          return;
      } else {
          apellido.setCustomValidity('');
      }

      if (telefono.value && !validatePhone(telefono.value)) {
          telefono.setCustomValidity('El teléfono solo debe contener números');
          telefono.reportValidity();
          return;
      } else {
          telefono.setCustomValidity('');
      }

      const submitButton = document.querySelector('.submit-button');
      const spinner = document.querySelector('.spinner');
      submitButton?.classList.add('loading');

      setTimeout(() => {
          submitButton?.classList.remove('loading');
          modal.style.display = 'block';
          form.reset();

          setTimeout(() => {
              modal.style.display = 'none';
          }, 3000);
      }, 1500);
  });

  closeButton?.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
  });
});

function initPricingToggle() {
  const toggle = document.getElementById('plan-toggle');
  if (!toggle) return;

  // Initialize with correct prices
  updatePrices(toggle.checked);

  // Update prices when toggle changes
  toggle.addEventListener('change', (e) => {
      updatePrices(e.target.checked);
  });

  function updatePrices(isYearly) {
      const monthlyPrices = document.querySelectorAll('.monthly-price');
      const yearlyPrices = document.querySelectorAll('.yearly-price');

      if (isYearly) {
          monthlyPrices.forEach(el => el.style.display = 'none');
          yearlyPrices.forEach(el => el.style.display = 'inline');
      } else {
          monthlyPrices.forEach(el => el.style.display = 'inline');
          yearlyPrices.forEach(el => el.style.display = 'none');
      }

      // Update row styling
      const rows = document.querySelectorAll('.pricing-table tbody tr');
      rows.forEach(row => {
          row.style.backgroundColor = isYearly 
              ? 'rgba(228, 113, 184, 0.1)'
              : '';
      });
  }

  // Efecto hover para las filas (sin cambios)
  const tableRows = document.querySelectorAll('.pricing-table tr');
  tableRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
          row.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          row.style.transform = 'scale(1.01)';
          row.style.transition = 'transform 0.3s ease';
      });

      row.addEventListener('mouseleave', () => {
          row.style.backgroundColor = '';
          row.style.transform = '';
      });
  });
}

// Enhanced Scroll Reveal with IntersectionObserver
// Initialize pricing toggle
document.addEventListener('DOMContentLoaded', initPricingToggle);

document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  });

  // Initialize blog cards with scroll reveal
  const blogCards = document.querySelectorAll('.blog-post, .blog-card, .post-card');

  // Make all cards visible immediately
  blogCards.forEach(card => {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
  });

  // Filtering system
  const filterLinks = document.querySelectorAll('.filter-nav a');

  // Set 'All' as active by default
  document.querySelector('.filter-nav a[href="#all"]')?.classList.add('active');

  filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.getAttribute('href');

          if (target === '#all') {
              // Show all posts
              document.querySelectorAll('.blog-post').forEach(post => {
                  post.style.display = 'flex';
              });
          } else {
              // Filter by category
              document.querySelectorAll('.blog-post').forEach(post => {
                  post.style.display = 'none';
              });
              document.querySelectorAll(target).forEach(post => {
                  post.style.display = 'flex';
              });
          }

          // Update active filter style
          filterLinks.forEach(link => link.classList.remove('active'));
          link.classList.add('active');
      });
  });
});