// Language switcher
function setLang(lang) {
  document.body.className = lang === 'en' ? 'lang-en' : '';
  document.getElementById('btn-it').classList.toggle('active', lang === 'it');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang;
}

// Countdown timer
const wedding = new Date('2027-06-12T16:00:00');

function updateCountdown() {
  const diff = wedding - new Date();
  if (diff <= 0) return;
  document.getElementById('cd-days').textContent = Math.floor(diff / 86400000);
  document.getElementById('cd-hours').textContent = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('cd-mins').textContent = Math.floor((diff % 3600000) / 60000);
}

updateCountdown();
setInterval(updateCountdown, 60000);

// RSVP form submission
function handleRSVP(e) {
  e.preventDefault();
  document.getElementById('rsvpForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// IBAN reveal / hide toggle
function revealIban() {
  const display = document.getElementById('ibanDisplay');
  const btn = document.getElementById('ibanBtn');
  display.classList.toggle('visible');
  const isVisible = display.classList.contains('visible');
  btn.querySelector('.it').textContent = isVisible ? 'Nascondi IBAN' : 'Mostra IBAN';
  btn.querySelector('.en').textContent = isVisible ? 'Hide IBAN' : 'Reveal IBAN';
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
