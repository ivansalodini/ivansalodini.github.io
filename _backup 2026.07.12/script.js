// Dropdown translations
const dropdownText = {
  'select-attending': {
    it: ['', 'Sì, ci saremo!', 'Purtroppo non possiamo'],
    en: ['', "Yes, we'll be there!", "Sorry, we can't make it"]
  }
};

// Language switcher
function setLang(lang) {
  document.body.className = lang === 'en' ? 'lang-en' : '';
  document.getElementById('btn-it').classList.toggle('active', lang === 'it');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang;

  // Update dropdown option text
  Object.keys(dropdownText).forEach(function(id) {
    const select = document.getElementById(id);
    if (!select) return;
    const texts = dropdownText[id][lang];
    Array.from(select.options).forEach(function(opt, i) {
      if (texts[i] !== undefined) opt.text = texts[i];
    });
  });
}

// Countdown timer
const wedding = new Date('2027-06-12T16:00:00+02:00');

function updateCountdown() {
  const diff = wedding - new Date();
  if (diff <= 0) return;
  document.getElementById('cd-days').textContent = Math.floor(diff / 86400000);
  document.getElementById('cd-hours').textContent = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('cd-mins').textContent = Math.floor((diff % 3600000) / 60000);
}

updateCountdown();
setInterval(updateCountdown, 60000);

// RSVP form submission via Formspree
async function handleRSVP(e) {
  e.preventDefault();
  const form = document.getElementById('rsvpForm');
  const data = new FormData(form);
  try {
    const response = await fetch('https://formspree.io/f/xkoewwag', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (err) {
    alert('Something went wrong. Please check your connection and try again.');
  }
}

// IBAN reveal / hide toggle
function revealIban() {
  const display = document.getElementById('ibanDisplay');
  const btn = document.getElementById('ibanBtn');
  display.classList.toggle('visible');
  const isVisible = display.classList.contains('visible');
  btn.querySelector('.it').textContent = isVisible ? 'Nascondi' : 'Come contribuire';
  btn.querySelector('.en').textContent = isVisible ? 'Hide' : 'How to contribute';
}

// Copy IBAN to clipboard
function copyIban() {
  const iban = document.getElementById('ibanNumber').textContent.trim();
  navigator.clipboard.writeText(iban).then(() => {
    document.getElementById('copyLabel-it').textContent = 'Copiato ✓';
    document.getElementById('copyLabel-en').textContent = 'Copied ✓';
    setTimeout(() => {
      document.getElementById('copyLabel-it').textContent = 'Copia →';
      document.getElementById('copyLabel-en').textContent = 'Copy →';
    }, 2000);
  });
}

// Contact number reveal / hide toggle
function revealContact(person) {
  const display = document.getElementById(person + 'Display');
  const btn = document.getElementById(person + 'Btn');
  display.classList.toggle('visible');
  const isVisible = display.classList.contains('visible');
  btn.querySelector('.it').textContent = isVisible ? 'Nascondi numero' : 'Mostra numero';
  btn.querySelector('.en').textContent = isVisible ? 'Hide number' : 'Show number';
}

// Hotel prices reveal / hide toggle
function revealPrices() {
  const display = document.getElementById('pricesDisplay');
  const btn = document.getElementById('pricesBtn');
  display.classList.toggle('visible');
  const isVisible = display.classList.contains('visible');
  btn.querySelector('.it').textContent = isVisible ? 'Nascondi tariffe →' : 'Mostra tariffe →';
  btn.querySelector('.en').textContent = isVisible ? 'Hide rates →' : 'Show rates →';
}

// Hotel contacts reveal / hide toggle
function revealHotelContacts() {
  const display = document.getElementById('hotelContactsDisplay');
  const btn = document.getElementById('hotelContactsBtn');
  display.classList.toggle('visible');
  const isVisible = display.classList.contains('visible');
  btn.querySelector('.it').textContent = isVisible ? 'Nascondi contatti →' : 'Mostra contatti →';
  btn.querySelector('.en').textContent = isVisible ? 'Hide contacts →' : 'Show contacts →';
}


// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', function() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
}
